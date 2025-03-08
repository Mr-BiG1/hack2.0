import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

function ChatInput({ sendMessage }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>
        <FaPaperPlane />
      </button>
    </div>
  );
}

export default ChatInput;
