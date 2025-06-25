import React, { useState } from "react";

function ContactSupport() {
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5000/support", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <h1>Contact Support</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Describe your issue"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default ContactSupport;
