export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
      <img src={product.image} alt={product.title} className="w-full h-40 object-cover" />
      <div className="p-3">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-gray-500">${product.price}</p>
        <button className="mt-2 w-full bg-indigo-600 text-white py-1.5 rounded hover:bg-indigo-500 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
