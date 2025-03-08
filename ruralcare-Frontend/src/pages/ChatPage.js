import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaUser, FaRobot } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../Chat.css"; 

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, navigate]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessage = { text: input, sender: "user" };
    setMessages([...messages, newMessage]);
    setLoading(true);
    setInput("");

    try {
      const response = await fetch("http://localhost:8080/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: " Error: Could not reach bot.", sender: "bot" }]);
    }
    setLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <FaRobot className="bot-icon" />
        <h2>RuralCare AI Bot</h2>
      </div>

      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender === "user" ? "user-msg" : "bot-msg"}`}>
            {msg.sender === "user" ? <FaUser className="user-icon" /> : <FaRobot className="bot-icon" />}
            <span className="message-text">{msg.text}</span>
          </div>
        ))}
        {loading && <p className="typing">Bot is typing...</p>}
        <div ref={chatEndRef}></div>
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          className="chat-input"
        />
        <button onClick={sendMessage} className="send-btn">
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
