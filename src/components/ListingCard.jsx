import { Link } from "react-router-dom";

export default function ListingCard({ listing }) {
  return (
    <Link to={`/listing/${listing.id}`} className="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
      <img src={listing.image} alt={listing.title} className="w-full h-40 object-cover" />
      <div className="p-3">
        <h3 className="text-lg font-semibold">{listing.title}</h3>
        <p className="text-gray-500">{listing.location}</p>
        <p className="text-indigo-600 font-bold mt-1">${listing.price}/night</p>
      </div>
    </Link>
  );
}
