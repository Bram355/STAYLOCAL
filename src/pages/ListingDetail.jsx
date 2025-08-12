// src/pages/ListingDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import listings from "../data/listingsData";

function ListingDetail() {
  const { id } = useParams();
  const listing = listings.find((l) => l.id === id);

  if (!listing) return <p>Listing not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{listing.title}</h1>
      <img
        src={listing.image}
        alt={listing.title}
        style={{ width: "100%", maxWidth: "600px", height: "400px", objectFit: "cover", borderRadius: "8px" }}
      />
      <p>{listing.description}</p>
      <p><strong>${listing.price}</strong> / night</p>
      <button style={{ padding: "10px 16px", cursor: "pointer" }}>Book Now</button>
    </div>
  );
}

export default ListingDetail;
