import React, { useState } from "react";
import { postGig } from "../api";

function Gigs() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [exp, setExp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await postGig({ title, description: desc, required_exp: exp });
    alert(response.message);
  };

  return (
    <div>
      <h1>Post a Gig 🎯</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
        <textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} /><br />
        <input placeholder="Required Experience" value={exp} onChange={(e) => setExp(e.target.value)} /><br />
        <button type="submit">Post Gig</button>
      </form>
    </div>
  );
}

export default Gigs;
