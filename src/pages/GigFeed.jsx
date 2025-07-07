import React, { useState, useEffect } from "react";

function GigFeed() {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    fetch("https://your-backend-url/api/gig/feed")
      .then((res) => res.json())
      .then((data) => setGigs(data))
      .catch((err) => console.error("Error fetching gigs:", err));
  }, []);

  return (
    <div>
      <h2>Gig Feed</h2>
      <div>
        {gigs.map((gig) => (
          <div key={gig.id} style={{ padding: 10, margin: 10, border: "1px solid #ccc" }}>
            <h3>{gig.title}</h3>
            <p>{gig.description}</p>
            <p><strong>Pay:</strong> ${gig.pay}</p>
            <p><strong>Location:</strong> {gig.location}</p>
            <button>Apply</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GigFeed;
