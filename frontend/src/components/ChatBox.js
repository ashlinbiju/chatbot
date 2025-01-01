import React from 'react';
import './ChatBox.css';

const ChatBox = ({ message, setMessage, handleTextSubmit, chatMessages }) => {
  return (
    <div className="chat-box">
      <div className="messages">
        {chatMessages.map((msg, index) => (
          <div key={index} className={msg.fromAI ? 'message from-ai' : 'message from-user'}>
            {msg.text}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleTextSubmit} className="chat-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button type="submit" className="send-btn">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;