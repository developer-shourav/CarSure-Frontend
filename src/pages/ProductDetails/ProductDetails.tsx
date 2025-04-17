import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "@/redux/features/product/productManagement.api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import SectionWrapper from "@/components/ui/wrapper/SectionWrapper";
import ProductDescription from "@/components/ui/ProductDescription/ProductDescription";
import SuggestedCars from "@/components/ui/SuggestedCars/SuggestedCars";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetProductDetailsQuery(id);
  const product = data?.data;
  const [quantity, setQuantity] = useState(1);
  const loggedInUser = useAppSelector(selectCurrentUser);
  const dispatch = useDispatch();

  if (isLoading || !product) {
    return (
      <SectionWrapper>
        <div className="min-h-screen py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
            <div className="space-y-4">
              <Skeleton className="h-96 w-full mb-4" />
            </div>

            {/* --- Product Info --- */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/2 mb-2" />

              <Skeleton className="h-8 w-1/2 mb-2" />

              <div className="text-sm space-y-1">
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-6 w-1/4 mb-2" />
                <Skeleton className="h-7 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
              </div>
            </div>
          </div>

          {/*-----Product Details Description---------  */}
          <Skeleton className="h-[160px] mt-10 rounded-2xl w-8/10 " />
        </div>
      </SectionWrapper>
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

            {/* --------Quantity Selector --------*/}
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
            {/* --------Action Buttons --------*/}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button disabled={product?.quantity === 0}
                onClick={() => {
                  if (!loggedInUser?.userId) {
                    toast.error("Please login to add to cart");
                    return;
                  }

                  if (loggedInUser?.userId) {
                    dispatch(
                      addToCart({
                        userId: loggedInUser.userId,
                        item: {
                          id: product._id,
                          name: product.carName,
                          price: product.price,
                          image: product.productImg,
                          quantity,
                        },
                      })
                    );
                    toast.success("Added to cart!");
                  }
                }}
                className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
              >
                { product?.quantity === 0 ? <span className="line-through">Out of Stock</span>: 'Add to Cart'}
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
