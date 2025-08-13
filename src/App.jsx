import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ListingDetail from "./pages/ListingDetail";
import HostProfile from "./pages/HostProfile";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import TopModeToggle from "./components/TopModeToggle";
import Marketplace from "./pages/Marketplace";
import { CartProvider } from "./context/CartContext";

// Replace with your real listings + image URLs
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

async function seedListings() {
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

function App() {
  useEffect(() => {
    seedListings();
  }, []);

  return (
    <Router>
      <CartProvider>
        {/* Gradient background wrapper */}
        <div className="flex flex-col min-h-screen bg-animated">
          {/* Navbar + Mode Toggle */}
          <div className="flex items-center justify-between px-4 py-2 bg-gray-100/80 shadow-md backdrop-blur">
            <Navbar />
            <TopModeToggle />
          </div>

          {/* Page Content */}
          <div className="flex-1 px-4 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/market" element={<Marketplace />} />
              <Route path="/listing/:id" element={<ListingDetail />} />
              <Route path="/host/:id" element={<HostProfile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
