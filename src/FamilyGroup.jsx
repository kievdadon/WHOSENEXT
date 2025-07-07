import React, { useState } from "react";

export default function FamilyGroup() {
  const [messages, setMessages] = useState(["Hi fam! Dinner at 6 🍽"]);

  const handleAdd = () => {
    const msg = prompt("Enter your message:");
    if (msg) setMessages([...messages, msg]);
  };

  return (
    <div>
      <h2>Family Group 👨‍👩‍👧</h2>
      <button onClick={handleAdd} style={styles.button}>Add Message</button>
      <ul style={styles.list}>
        {messages.map((msg, i) => (
          <li key={i} style={styles.msg}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  button: {
    background: "#9575CD",
    color: "white",
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    marginTop: 10,
    cursor: "pointer",
  },
  list: {
    marginTop: 15,
    paddingLeft: 0,
  },
  msg: {
    background: "#D1C4E9",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "10px",
    listStyle: "none",
  },
};
