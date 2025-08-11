import { useParams, Link } from "react-router-dom";
import listingsData from "../data/listingsData";
import { useCart } from "../context/CartContext";

export default function ListingDetail() {
  const { id } = useParams();
  const listing = listingsData.find((item) => item.id === parseInt(id));
  const { addToCart } = useCart();

  if (!listing) {
    return <p className="p-6">Listing not found.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img src={listing.image} alt={listing.title} className="w-full h-64 object-cover rounded-lg" />
      <h1 className="text-3xl font-bold mt-4">{listing.title}</h1>
      <p className="text-gray-600">{listing.location}</p>
      <p className="text-green-600 font-bold">${listing.price} / night</p>

      <Link
        to={`/host/${listing.hostId}`}
        className="text-blue-500 underline block mt-2"
      >
        View Host Profile
      </Link>

      <p className="mt-4">{listing.description}</p>

      <h3 className="mt-4 font-semibold">Amenities:</h3>
      <ul className="list-disc list-inside">
        {listing.amenities.map((amenity, idx) => (
          <li key={idx}>{amenity}</li>
        ))}
      </ul>

      <button
        onClick={() => {
          addToCart(listing);
          alert(`${listing.title} has been added to your cart`);
        }}
        className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
      >
        Book Now
      </button>
    </div>
  );
}
