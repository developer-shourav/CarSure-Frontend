import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "@/redux/features/product/productManagement.api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetProductDetailsQuery(id);
  const product = data?.data;
  const [quantity, setQuantity] = useState(1);

  if (isLoading || !product) {
    return (
      <div className="p-10">
        <Skeleton className="h-96 w-full mb-4" />
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-5 w-1/3 mb-2" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white py-16 px-4 lg:px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* --- Product Image Gallery --- */}
        <div className="space-y-4">
          <img
            src={product.productImg}
            alt={product.carName}
            className="w-full h-96 object-cover rounded-xl shadow"
          />
          {/* Mini image gallery can go here if you have multiple images */}
        </div>

        {/* --- Product Info --- */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">{product.carName}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {product.description}
          </p>
          <p className="text-xl font-semibold text-red-600">
            ${product.price.toLocaleString()}
          </p>

          <div className="text-sm space-y-1">
            <p>Brand: {product.brand}</p>
            <p>Model: {product.model}</p>
            <p>Category: {product.category}</p>
            <p>Stock: {product.stockQty} available</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </Button>
            <span>{quantity}</span>
            <Button variant="outline" onClick={() => setQuantity((q) => q + 1)}>
              +
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto">
              Add to Cart
            </Button>
            <Button
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-zinc-800 w-full sm:w-auto"
              onClick={() => {
                // Navigate to checkout or open modal
              }}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      {/* --- Specifications --- */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-4">Specifications</h3>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
          <li>Engine: {product.specs?.engine}</li>
          <li>Mileage: {product.specs?.mileage}</li>
          <li>Fuel Type: {product.specs?.fuelType}</li>
          <li>Transmission: {product.specs?.transmission}</li>
          {/* Add more from your backend as needed */}
        </ul>
      </div>

      {/* --- Similar Products --- */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6">Similar Cars</h3>
        {/* You can use a reusable ProductCard here */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Map similar products */}
          {/* Placeholder: Replace with actual data */}
          {[1, 2, 3, 4].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow"
            >
              <div className="h-40 bg-gray-200 dark:bg-zinc-700 rounded mb-3" />
              <h4 className="text-lg font-semibold mb-1">
                Similar Car {i + 1}
              </h4>
              <p className="text-sm text-gray-500">Brand XYZ</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
