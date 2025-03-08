import React from "react";
import { FaUser, FaRobot } from "react-icons/fa";
import "../Chat.css"; 

function ChatMessage({ message }) {
  return (
    <div className={`chat-message ${message.sender === "user" ? "user-message" : "bot-message"}`}>
      <div className="message-content">
        {message.sender === "user" ? (
          <FaUser className="user-icon" />
        ) : (
          <FaRobot className="bot-icon" />
        )}
        <p className="message-text">{message.text}</p>
      </div>
    </div>
  );
}

export default ChatMessage;
