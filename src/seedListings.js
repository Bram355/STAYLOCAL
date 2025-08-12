// src/seedListings.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Replace these with your real listings
const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    location: "Mombasa, Kenya",
    price: 120,
    image: "https://yourimageurl1.jpg",
    description: "Enjoy ocean views, modern design, and a private pool.",
    amenities: ["Wi-Fi", "Kitchen", "Air Conditioning"]
  },
  {
    title: "Luxury Mountain Villa",
    location: "Naivasha, Kenya",
    price: 250,
    image: "https://yourimageurl2.jpg",
    description: "Breathtaking mountain views with modern luxury amenities.",
    amenities: ["Wi-Fi", "Private Pool", "BBQ"]
  },
  {
    title: "Urban Apartment",
    location: "Nairobi, Kenya",
    price: 90,
    image: "https://yourimageurl3.jpg",
    description: "Modern apartment in the heart of the city.",
    amenities: ["Wi-Fi", "Parking", "Gym"]
  }
];

export async function seedListings() {
  try {
    const listingsRef = collection(db, "listings");
    for (let listing of sampleListings) {
      await addDoc(listingsRef, listing);
    }
    console.log("✅ Sample listings added successfully!");
  } catch (error) {
    console.error("❌ Error seeding listings:", error);
  }
}
