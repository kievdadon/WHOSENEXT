import React, { useState } from "react";

export default function FamilyGroup() {
  const [messages, setMessages] = useState([
    { sender: "Mom", content: "Dinner is ready!" },
    { sender: "You", content: "On my way!" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const updated = [...messages, { sender: "You", content: newMessage }];
    setMessages(updated);
    setNewMessage("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👨‍👩‍👧 Family Group Chat</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div key={i} style={styles.message}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div style={styles.inputArea}>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: "40px auto",
    background: "#fff",
    padding: 20,
    borderRadius: 16,
    boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    color: "#6A1B9A",
    marginBottom: 20,
  },
  chatBox: {
    maxHeight: 300,
    overflowY: "auto",
    border: "1px solid #ddd",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  message: {
    marginBottom: 10,
  },
  inputArea: {
    display: "flex",
    gap: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
  },
  sendButton: {
    padding: "10px 16px",
    background: "#8E24AA",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
};
