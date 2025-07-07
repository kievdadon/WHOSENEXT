import React, { useState, useEffect } from "react";

function MarketplaceFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://your-backend-url/api/marketplace/feed")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <div>
      <h2>Marketplace Feed</h2>
      <div>
        {posts.map((post) => (
          <div key={post.id} style={{ padding: 10, margin: 10, border: "1px solid #ccc" }}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p><strong>Price:</strong> ${post.price}</p>
            <p><strong>Location:</strong> {post.location}</p>
            <button>Contact Seller</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketplaceFeed;
