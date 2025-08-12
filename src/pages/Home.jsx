// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import listings from "../data/listingsData";

function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>StayLocal Listings</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {listings.map((listing) => (
          <div
            key={listing.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center"
            }}
          >
            <img
              src={listing.image}
              alt={listing.title}
              style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
            />
            <h3>{listing.title}</h3>
            <p>{listing.description}</p>
            <p><strong>${listing.price}</strong> / night</p>
            <Link to={`/listing/${listing.id}`}>
              <button style={{ padding: "8px 12px", marginTop: "10px", cursor: "pointer" }}>
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
