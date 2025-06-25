import React, { useState } from "react";
import { postGig } from "../api";  // Import the API function

function Gigs() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await postGig({ title, description: desc });
    alert(response.message); // Handle success/failure
  };

  return (
    <div>
      <h1>Post a Gig 🎯</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Gig Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Gig Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button type="submit">Post Gig</button>
      </form>
    </div>
  );
}

export default Gigs;

