import React, { useState } from "react";

function PostGig() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pay, setPay] = useState("");
  const [location, setLocation] = useState("");
  const [experienceRequired, setExperienceRequired] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const formData = { title, description, pay, location, experience_required: experienceRequired };

    try {
      const res = await fetch("https://your-backend-url/api/gig/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.error("Gig post failed:", err);
      setMessage("Failed to post.");
    }
  };

  return (
    <div>
      <h2>Post a New Gig</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Pay"
        value={pay}
        onChange={(e) => setPay(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder="Experience Required"
        value={experienceRequired}
        onChange={(e) => setExperienceRequired(e.target.value)}
      />
      <button onClick={handleSubmit}>Post Gig</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PostGig;
