import React, { useState, useEffect } from "react";

export default function MarketplaceBoard() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "For Sale",
    mainImage: null,
    verifyImages: [],
  });

  const [previewMain, setPreviewMain] = useState(null);
  const [previewVerify, setPreviewVerify] = useState([]);

  useEffect(() => {
    const readOut = (text) => {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "en-US";
      window.speechSynthesis.speak(utter);
    };

    if (posts.length > 0) {
      const latest = posts[posts.length - 1];
      readOut(`${latest.title}. ${latest.description}. Price: ${latest.price}`);
    }
  }, [posts]);

  const handleImageChange = (e, type) => {
    const fileList = Array.from(e.target.files);
    if (type === "main") {
      setFormData({ ...formData, mainImage: fileList[0] });
      setPreviewMain(URL.createObjectURL(fileList[0]));
    } else {
      setFormData({ ...formData, verifyImages: fileList });
      setPreviewVerify(fileList.map((file) => URL.createObjectURL(file)));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      ...formData,
      id: Date.now(),
      mainImageUrl: previewMain,
      verifyImageUrls: previewVerify,
    };
    setPosts([...posts, newPost]);

    // Reset
    setFormData({
      title: "",
      description: "",
      price: "",
      category: "For Sale",
      mainImage: null,
      verifyImages: [],
    });
    setPreviewMain(null);
    setPreviewVerify([]);
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>WHOSENXT Marketplace / Gig Board</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          style={styles.input}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          style={styles.textarea}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          style={styles.input}
          required
        />

        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          style={styles.input}
        >
          <option>For Sale</option>
          <option>Help Needed</option>
          <option>Move Furniture</option>
          <option>Other</option>
        </select>

        <label>Main Picture:</label>
        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "main")} />
        {previewMain && <img src={previewMain} alt="Preview" style={styles.preview} />}

        <label>Verification Pictures (up to 3):</label>
        <input type="file" accept="image/*" multiple onChange={(e) => handleImageChange(e, "verify")} />
        <div style={styles.previewRow}>
          {previewVerify.map((src, idx) => (
            <img key={idx} src={src} alt={`Verify ${idx}`} style={styles.previewSmall} />
          ))}
        </div>

        <button type="submit" style={styles.button}>Post</button>
      </form>

      <div style={styles.posts}>
        {posts.map((post) => (
          <div key={post.id} style={styles.card}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p>💲{post.price} | 📦 {post.category}</p>
            <img src={post.mainImageUrl} alt="Main" style={styles.preview} />
            <div style={styles.previewRow}>
              {post.verifyImageUrls.map((src, idx) => (
                <img key={idx} src={src} alt={`v-${idx}`} style={styles.previewSmall} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    maxWidth: 700,
    margin: "30px auto",
    padding: "0 16px",
    fontFamily: "'Baloo 2', sans-serif",
  },
  heading: {
    color: "#6A1B9A",
    fontSize: "26px",
    textAlign: "center",
  },
  form: {
    background: "#fff",
    padding: 20,
    borderRadius: 16,
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    border: "1px solid #ccc",
    marginBottom: 12,
    fontSize: 16,
  },
  textarea: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    border: "1px solid #ccc",
    marginBottom: 12,
    fontSize: 16,
    height: 80,
  },
  button: {
    background: "#8E24AA",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "12px 20px",
    cursor: "pointer",
    fontSize: 16,
  },
  preview: {
    marginTop: 8,
    width: "100%",
    borderRadius: 12,
  },
  previewRow: {
    display: "flex",
    gap: 8,
    marginTop: 8,
    flexWrap: "wrap",
  },
  previewSmall: {
    width: 80,
    height: 80,
    objectFit: "cover",
    borderRadius: 10,
  },
  posts: {
    marginTop: 30,
  },
  card: {
    background: "#F3E5F5",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
};
