const admin = require("firebase-admin");
const { auth, db } = require("../config/firebase");

// User Registration
const userRegister = async (req, res) => {
    try {
        let { name, email, password, dob, address, age, weight, height, phoneNumber, medicalCondition, medicalHistory } = req.body;

        medicalCondition = medicalCondition || "N/A";
        medicalHistory = medicalHistory || "N/A";

        // Register user with Firebase Authentication
        const userRecord = await auth.createUser({
            email,
            password,
            displayName: name,
            phoneNumber: phoneNumber || "",
        });

        // Save user details in Firestore
        await db.collection("users").doc(userRecord.uid).set({
            name: name || "N/A",
            email: email || "N/A",
            dob: dob || "N/A",
            address: address || "N/A",
            age: age || "N/A",
            weight: weight || "N/A",
            height: height || "N/A",
            phoneNumber: phoneNumber || "N/A",
            medicalCondition,
            medicalHistory,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        res.status(201).json({ message: "User registered successfully!", userId: userRecord.uid });
    } catch (error) {
        res.status(500).json({ error: `Error: ${error.message}` });
    }
};



// User Login & Token Generation
const postLogin = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ error: " No ID token provided" });
        }

        
        const decodedToken = await auth.verifyIdToken(token);
        const userId = decodedToken.uid;
        const email = decodedToken.email || "N/A";

        res.status(200).json({
            message: "Login successful",
            userId,
            email,
            token,
        });
    } catch (error) {
        res.status(403).json({ error: "Invalid token", details: error.message });
    }
};


const protectedRoute = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split("Bearer ")[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const userRef = db.collection("users").doc(decodedToken.uid);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({ error: "User not found" });
        }

        const userData = userDoc.data();
        
        res.json({
            user: {
                name: userData.name,
                email: userData.email,
                phoneNumber: userData.phoneNumber,
                medicalCondition: userData.medicalCondition,
                medicalHistory: userData.medicalHistory,
                age: userData.age,
                height: userData.height,
                weight: userData.weight
            }
        });
    } catch (error) {
        res.status(403).json({ error: "Invalid token", details: error.message });
    }
};


const updateUserProfile = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split("Bearer ")[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const userId = decodedToken.uid;

        const { name, phoneNumber } = req.body;

        // Update Firestore user document
        await db.collection("users").doc(userId).update({
            name: name || "",
            phoneNumber: phoneNumber || "",
        });

        res.json({ message: "Profile updated successfully!" });

    } catch (error) {
        res.status(500).json({ error: "Failed to update profile", details: error.message });
    }
};

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
    - DO NOT diagnose the user.
    - If symptoms are serious, recommend emergency care.
    - Keep responses professional and medically safe.
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
      return " Error: Could not retrieve AI response.";
    }
  };
  

module.exports = { userRegister, postLogin, protectedRoute,updateUserProfile ,callGPTMedicalAPI };
