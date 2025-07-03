// ProductSearch.jsx
import React, { useEffect, useState } from "react";
import { getProducts, getStoreAvailability } from "./api";

export default function ProductSearch() {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [storeStatus, setStoreStatus] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts(category, search);
      setProducts(data);
    }
    fetchProducts();
  }, [category, search]);

  // Example: fetch availability for store id 1 (replace as needed)
  useEffect(() => {
    async function fetchAvailability() {
      const status = await getStoreAvailability(1);
      setStoreStatus(status.is_open ? "Open" : "Closed");
    }
    fetchAvailability();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Products {storeStatus && `(Store is ${storeStatus})`}</h2>

      <input
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 12 }}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 20 }}
      >
        <option value="">All Categories</option>
        <option value="Food">Food</option>
        <option value="Clothing">Clothing</option>
        <option value="General">General</option>
      </select>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.length === 0 && <li>No products found.</li>}
        {products.map((p) => (
          <li key={p.id} style={{ marginBottom: 16, borderBottom: "1px solid #ccc", paddingBottom: 12 }}>
            <b>{p.name}</b> - {p.category} - ${p.price.toFixed(2)}
            <p>{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
