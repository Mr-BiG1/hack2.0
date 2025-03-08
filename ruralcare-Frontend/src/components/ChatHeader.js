import React from "react";
import { FaRobot } from "react-icons/fa";

function ChatHeader() {
  return (
    <div className="chat-header">
      <FaRobot className="bot-icon" />
      <h2>RuralCare AI Bot</h2>
    </div>
  );
}

export default ChatHeader;
    