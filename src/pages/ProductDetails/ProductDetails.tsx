import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "@/redux/features/product/productManagement.api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import SectionWrapper from "@/components/ui/wrapper/SectionWrapper";
import ProductDescription from "@/components/ui/ProductDescription/ProductDescription";
import SuggestedCars from "@/components/ui/SuggestedCars/SuggestedCars";

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
    <SectionWrapper>
      <div className="min-h-screen py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
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
              <Button
                variant="outline"
                onClick={() => setQuantity((q) => q + 1)}
              >
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

        {/*-----Product Details Description---------  */}
        <ProductDescription description={product.description} />

        {/* --- Similar Products --- */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 lg:mb-10">Similar Cars</h3>
          <SuggestedCars />
        </div>
      </div>
    </SectionWrapper>
  );
}
