import React, { useState, useEffect } from "react";

function FamilyGroupChat({ groupId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetch(`https://your-backend-url/api/family/group/${groupId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, [groupId]);

  const handleSend = () => {
    const messageData = { sender: "User", message: newMessage };

    fetch(`https://your-backend-url/api/family/group/${groupId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageData),
    })
      .then(() => setMessages([...messages, { sender: "User", message: newMessage }]))
      .catch((err) => console.error("Send failed:", err));
  };

  return (
    <div>
      <h2>Family Group Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default FamilyGroupChat;
