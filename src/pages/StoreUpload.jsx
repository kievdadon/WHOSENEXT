import React, { useState } from "react";

function StoreUpload() {
  const [storeName, setStoreName] = useState("");
  const [logo, setLogo] = useState(null);
  const [csv, setCsv] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("store_name", storeName);
    if (logo) formData.append("logo", logo);
    if (csv) formData.append("csv", csv);

    try {
      const res = await fetch("https://your-backend-url/api/upload-store", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setMessage(data.message || data.error);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload a Store</h2>
      <input
        type="text"
        placeholder="Store Name"
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
      />
      <br /><br />
      <input type="file" accept="image/*" onChange={(e) => setLogo(e.target.files[0])} />
      <br /><br />
      <input type="file" accept=".csv" onChange={(e) => setCsv(e.target.files[0])} />
      <br /><br />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
}

export default StoreUpload;
