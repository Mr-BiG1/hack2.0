import React, { useState, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import "../Chat.css";

function Chat() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Fetch User Medical Data from Firestore
    const fetchUserData = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            return { error: "Unauthorized: Please log in." };
        }

        try {
            const response = await fetch("http://localhost:8080/api/auth/protected", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();

            if (response.ok && data.user) {
                return {
                    name: data.user.name,
                    age: data.user.age,
                    email: data.user.email,
                    phoneNumber: data.user.phoneNumber,
                    height: data.user.height,
                    weight: data.user.weight,
                    medicalCondition: data.user.medicalCondition,
                    medicalHistory: data.user.medicalHistory
                };
            } else {
                return { error: data.error };
            }
        } catch (error) {
            return { error: "Failed to load user data. Check your network connection." };
        }
    };
    const getNearbyDoctors = async (specialty) => {
        try {
            const response = await fetch(`http://localhost:8080/api/doctors?specialty=${specialty}`);
            const data = await response.json();

            if (data.length > 0) {
                return data.map(doctor => `- **${doctor.name}** (${doctor.location})`).join("\n");
            } else {
                return "No nearby doctors found. Please check with local hospitals.";
            }
        } catch (error) {
            return "⚠️ **Error:** Could not fetch doctor information.";
        }
    };

    //  Analyze Symptoms & Provide Recommendations
    const analyzeSymptoms = async (userMessage, userData) => {
        //  Step 1: Emergency Symptom Check
        if (await isEmergency(userMessage)) {
            return " Emergency Alert: Your symptoms may indicate a serious condition. Call 911 immediately or visit the nearest ER!**";
        }

        //  Step 2: Check if Symptoms Match a Known Specialist
        const symptomToSpecialist = {
            "chest pain": "Cardiologist",
            "dizziness": "Neurologist",
            "cough with fever": "Pulmonologist",
            "abdominal pain": "Gastroenterologist",
            "skin rash": "Dermatologist",
            "joint pain": "Rheumatologist",
            "severe headache": "Neurologist",
            "vision problems": "Ophthalmologist",
            "persistent back pain": "Orthopedic Specialist",
            "frequent urination": "Urologist",
            "mental stress or depression": "Psychiatrist",
            "allergic reactions": "Allergist",
            "ear pain or infection": "ENT Specialist",
            "uncontrolled diabetes": "Endocrinologist"
        };

        let response = "";
        let specialist = null;

        for (const symptom in symptomToSpecialist) {
            if (userMessage.toLowerCase().includes(symptom)) {
                specialist = symptomToSpecialist[symptom];
                response += `🔎 **Based on your symptoms, I recommend visiting a ${specialist}.**\n`;
            }
        }

        //  Step 3: Find Nearby Doctors if Specialist is Identified
        if (specialist) {
            response += "\n🩺 Searching for nearby doctors...";
            const doctorList = await getNearbyDoctors(specialist);
            response += `\n\n**Available Specialists:**\n${doctorList}`;
        } else {
            //  Step 4: Use AI if No Specialist is Found
            response = await callGPTMedicalAPI(userMessage, userData);
        }

        return response;
    };

    //  Check for Emergency Cases
    const isEmergency = async (userMessage) => {
        const emergencySymptoms = ["severe chest pain", "difficulty breathing", "unconscious", "numbness in arm"];

        for (const symptom of emergencySymptoms) {
            if (userMessage.toLowerCase().includes(symptom)) {
                return true;
            }
        }
        return false;
    };

    //  Call GPT-4 API for Advanced Analysis
    const callGPTMedicalAPI = async (userMessage, userData) => {
        const prompt = `
        Patient Name: ${userData.name}
        Age: ${userData.age}
        Weight: ${userData.weight} kg
        Height: ${userData.height} cm
        Medical History: ${userData.medicalHistory}
        Current Symptoms: ${userMessage}
      
        **Task:**
        - Analyze the user's symptoms.
        - Suggest which medical department they should visit.
        - Do NOT diagnose the user directly.
        - If symptoms indicate a serious condition, advise the user to seek emergency care.
        - Keep responses professional and safe.
        `;

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "gpt-4-turbo",
                    messages: [{ role: "user", content: prompt }]
                })
            });

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            return "Error:  Could not retrieve AI response.";
        }
    };

    // Fetch Nearby Doctors API


    //  Handle User Messages
    const sendMessage = async (text) => {
        if (!text.trim()) return;

        const newMessage = { text, sender: "user" };
        setMessages([...messages, newMessage]);
        setLoading(true);

        // Fetch User Medical History
        const userData = await fetchUserData();

        // Medical Analysis Based on Symptoms
        let responseMessage = await analyzeSymptoms(text, userData);

        setMessages([...messages, newMessage, { text: responseMessage, sender: "bot" }]);
        setLoading(false);
    };

    return (
        <div className="chat-container">
            <ChatHeader />
            <div className="chat-body">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg} />
                ))}
                {loading && <p className="typing">Bot is typing...</p>}
                <div ref={chatEndRef}></div>
            </div>
            <ChatInput sendMessage={sendMessage} />
        </div>
    );
}

export default Chat;
