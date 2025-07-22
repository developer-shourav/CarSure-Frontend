import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "@/redux/features/product/productManagement.api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import SectionWrapper from "@/components/ui/wrapper/SectionWrapper";
import ProductDescription from "@/components/ui/ProductDescription/ProductDescription";
import SuggestedCars from "@/components/ui/SuggestedCars/SuggestedCars";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import ProductImageGallery from "@/components/ui/ProductImageGallery/ProductImageGallery";
import { Star, StarHalf, Heart } from "lucide-react";
import ProductShareInfo from "@/components/ui/ProductShareInfo/ProductShareInfo";
import { addToWhitelist, removeFromWhitelist, selectWhitelistItems } from "@/redux/features/whitelist/whitelistSlice";
import { successTheme } from "@/styles/toastThemes";

export default function ProductDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetProductDetailsQuery(id);
  const product = data?.data;
  const [quantity, setQuantity] = useState(1);
  const loggedInUser = useAppSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const userId = loggedInUser?.userId;
  const whitelistItems = useAppSelector(selectWhitelistItems(userId || ""));

  const handleWhitelistClick = (car: any) => {
    if (userId) {
      const isWhitelisted = whitelistItems.some((item) => item.id === car._id);
      if (isWhitelisted) {
        dispatch(removeFromWhitelist({ userId, id: car._id }));
        toast.success("Removed from whitelist", successTheme);
      } else {
        dispatch(
          addToWhitelist({
            userId,
            item: { id: car._id, name: car.carName, price: car.price, image: car.productImg[0] },
          })
        );
        toast.success("Added to whitelist", successTheme);
      }
    }
  };

  useEffect(() => {
    if (product?.quantity < quantity) {
      toast.error("Order over the Available quantity");
    }
  }, [product?.quantity, quantity]);

  const stars = [];
  const fullStars = Math.floor(product?.rating);
  const hasHalfStar = product?.rating % 1 !== 0;
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push("full");
    } else if (i === fullStars && hasHalfStar) {
      stars.push("half");
    } else {
      stars.push("empty");
    }
  }

  if (isLoading || !product) {
    return (
      <SectionWrapper>
        <div className="min-h-screen py-10 mt-[62px] lg:mt-[116px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end ">
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
      <div className="min-h-screen py-10 mt-[62px] lg:mt-[130px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
          {/* --- Product Image Gallery --- */}
          <ProductImageGallery images={product?.productImg} />

          {/* --- Product Info --- */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{product?.carName}</h2>
            <div className="flex items-center gap-1">
              {stars.map((starType, idx) =>
                starType === "full" ? (
                  <Star
                    key={idx}
                    size={15}
                    className="text-yellow-600 fill-yellow-500"
                  />
                ) : starType === "half" ? (
                  <StarHalf
                    key={idx}
                    size={15}
                    className="text-yellow-600 fill-yellow-500"
                  />
                ) : (
                  <Star key={idx} size={15} className="text-gray-300" />
                )
              )}{" "}
              <span className=" font-semibold text-gray-700 dark:text-gray-400">
                {product.rating}
              </span>
            </div>

            <div className="flex items-center justify-between border-b pb-2">
              <p className="text-xl lg:text-2xl font-bold text-red-600">
                ${product?.price.toLocaleString()}
              </p>
              <p>
                {product?.inStock ? (
                  <span className="font-bold text-green-500">In Stock</span>
                ) : (
                  <span className="font-bold text-red-500 line-through">
                    Out Of Stock
                  </span>
                )}{" "}
              </p>
            </div>
            <p className="text-sm  text-gray-600 dark:text-gray-300">
              {product?.description?.slice(0, 160) + "..."}
            </p>

            <div className="text-sm lg:text-[15px] space-y-2 font-semibold text-gray-700 dark:text-gray-200">
              <p>Brand: {product?.brand}</p>
              <p>Model: {product?.model}</p>
              <p>Category: {product?.category}</p>
              <p>Car Left: {product?.quantity} Only</p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
              {/* --------Quantity Selector --------*/}
              <div className="flex items-center justify-center gap-4 rounded-md w-12/12 md:w-3/12 border py-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-lg"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  disabled={product?.quantity < quantity}
                  onClick={() => {
                    setQuantity((q) => q + 1);
                  }}
                  className="text-lg"
                >
                  +
                </button>
              </div>
              {/* --------Action Buttons --------*/}
              <div className="flex flex-col sm:flex-row gap-3 w-12/12 md:w-9/12 ">
                <Button
                  disabled={
                    product?.quantity === 0 || product?.quantity < quantity
                  }
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
                            id: product?._id,
                            name: product?.carName,
                            price: product?.price,
                            image: product?.productImg[0],
                            quantity,
                          },
                        })
                      );
                      toast.success("Added to cart!");
                    }
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white w-full block"
                >
                  {product?.quantity === 0 ? (
                    <span className="line-through">Out of Stock</span>
                  ) : (
                    "Add to Cart"
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleWhitelistClick(product)}
                >
                  <Heart
                    className={`size-5 mr-2 ${
                      whitelistItems.some((item) => item.id === product._id)
                        ? "fill-current text-pink-600"
                        : "text-black"
                    }`}
                  />
                  {whitelistItems.some((item) => item.id === product._id)
                    ? "Remove from Whitelist"
                    : "Add to Whitelist"}
                </Button>
              </div>
            </div>

            <ProductShareInfo
              url={`https://car-sure.vercel.app/cars/${product?._id}`}
              title={`${product?.carName} - ${product?.brand} ${product?.model} -CarSure Awesome cars collections`}
            />
          </div>
        </div>

        {/*-----Product Details Description---------  */}
        <ProductDescription description={product?.description} />

        {/* --- Similar Products --- */}
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-6 ">Similar Cars</h3>
          <SuggestedCars suggestion={product.category} />
        </div>
      </div>
    </SectionWrapper>
  );
}
