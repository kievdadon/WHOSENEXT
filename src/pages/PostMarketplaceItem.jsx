import React, { useState } from "react";

function PostMarketplaceItem() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => setImages([...e.target.files]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("location", location);
    for (const image of images) formData.append("images", image);

    try {
      const res = await fetch("https://your-backend-url/api/marketplace/post", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.error("Post failed:", err);
      setMessage("Failed to post.");
    }
  };

  return (
    <div>
      <h2>Post a New Marketplace Item</h2>
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
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="file"
        multiple
        onChange={handleImageChange}
      />
      <button onClick={handleSubmit}>Post Item</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PostMarketplaceItem;
