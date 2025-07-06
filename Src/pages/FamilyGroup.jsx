import React, { useState, useEffect } from "react";

export default function FamilyGroup() {
  const [familyCode, setFamilyCode] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [locationSharing, setLocationSharing] = useState(false);

  function joinFamily() {
    if (familyCode.trim() !== "") {
      setJoined(true);
      speak(`You've joined family group ${familyCode}`);
    }
  }

  function speak(text) {
    const voice = new SpeechSynthesisUtterance(text);
    voice.lang = "en-US";
    window.speechSynthesis.speak(voice);
  }

  function sendMessage() {
    if (newMessage.trim() === "") return;

    const messageObj = {
      id: Date.now(),
      text: newMessage,
    };

    setMessages([...messages, messageObj]);
    speak(newMessage);
    setNewMessage("");
  }

  function toggleLocationSharing() {
    const newStatus = !locationSharing;
    setLocationSharing(newStatus);
    speak(newStatus ? "Location sharing enabled" : "Location sharing disabled");
  }

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>👪 Family Group</h2>

      {!joined ? (
        <div style={styles.card}>
          <input
            value={familyCode}
            onChange={(e) => setFamilyCode(e.target.value)}
            placeholder="Enter or create family code"
            style={styles.input}
          />
          <button style={styles.button} onClick={joinFamily}>
            Join / Create
          </button>
        </div>
      ) : (
        <div style={styles.card}>
          <p style={styles.codeText}>Group Code: <strong>{familyCode}</strong></p>

          <div style={styles.messages}>
            {messages.map((msg) => (
              <div key={msg.id} style={styles.messageBubble}>
                🗣️ {msg.text}
              </div>
            ))}
          </div>

          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Send a message to the group"
            style={styles.input}
          />
          <button style={styles.button} onClick={sendMessage}>
            Send & Read Aloud
          </button>

          <div style={styles.toggleBox}>
            <label>
              <input
                type="checkbox"
                checked={locationSharing}
                onChange={toggleLocationSharing}
              />{" "}
              Share my location with family
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: 600,
    margin: "30px auto",
    fontFamily: "'Baloo 2', cursive",
    padding: "0 16px",
  },
  heading: {
    color: "#6A1B9A",
    fontSize: "26px",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 16,
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    border: "1px solid #ccc",
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    background: "#8E24AA",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "12px 20px",
    fontSize: 16,
    cursor: "pointer",
    marginBottom: 16,
  },
  codeText: {
    fontSize: 16,
    marginBottom: 12,
  },
  messages: {
    maxHeight: 200,
    overflowY: "auto",
    marginBottom: 16,
  },
  messageBubble: {
    background: "#F3E5F5",
    padding: 10,
    borderRadius: 12,
    marginBottom: 8,
  },
  toggleBox: {
    marginTop: 10,
    fontSize: 15,
  },
};
