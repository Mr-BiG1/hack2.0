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

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    const newMessage = { text, sender: "user" };
    setMessages([...messages, newMessage]);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      setMessages([...messages, newMessage, { text: data.reply, sender: "bot" }]);
    } catch (error) {
      setMessages([...messages, newMessage, { text: "⚠️ Error: Could not reach bot.", sender: "bot" }]);
    }
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
