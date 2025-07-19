import { useGetAllProductsQuery } from "@/redux/features/product/productManagement.api";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Star, StarHalf } from "lucide-react";

export default function SuggestedCars({suggestion}: { suggestion: string }) {
  console.log(suggestion);
  const {
    data: carResponse,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery(
    [
      { name: "limit", value: "10" },
      { name: "category", value: suggestion },
    ],
    {
      pollingInterval: 300000,
      refetchOnReconnect: true,
    }
  );

  const isLoadingState = isLoading || isFetching;
  const cars = carResponse?.data;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {isLoadingState
        ? Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow"
            >
              <Skeleton className="w-full h-40" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
            </div>
          ))
        : cars?.map((car) => {
            const stars = [];
            const fullStars = Math.floor(car.rating);
            const hasHalfStar = car.rating % 1 !== 0;
            for (let i = 0; i < 5; i++) {
              if (i < fullStars) {
                stars.push("full");
              } else if (i === fullStars && hasHalfStar) {
                stars.push("half");
              } else {
                stars.push("empty");
              }
            }

            return (
              <div
                key={car._id}
                className="relative bg-white dark:bg-zinc-900 rounded-lg overflow-hidden shadow hover:shadow-xl transition group"
              >
                {/* --------Heart Icon-------- */}
                <button
                  title="Add to favorite"
                  className="absolute top-3 right-3 z-10 p-1 hidden group-hover:block bg-white  rounded-full"
                >
                  <Heart className="size-6 text-black  hover:text-pink-600" />
                </button>

                <img
                  src={car.productImg[0]}
                  alt={car.carName}
                  loading="lazy"
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                />

                <div className="p-4 space-y-1">
                  <h3 className="text-lg font-semibold text-black dark:text-white truncate">
                    {car.carName}
                  </h3>
                  <div className="flex items-center gap-1">
                    {stars.map((starType, idx) =>
                      starType === "full" ? (
                        <Star
                          key={idx}
                          size={13}
                          className="text-yellow-600 fill-yellow-500"
                        />
                      ) : starType === "half" ? (
                        <StarHalf
                          key={idx}
                          size={13}
                          className="text-yellow-600 fill-yellow-500"
                        />
                      ) : (
                        <Star key={idx} size={13} className="text-gray-300" />
                      )
                    )}
                  </div>
         
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Model: <span className="font-medium">{car.model}</span>
                  </p>
                 
                  <p className="text-red-600 font-bold">
                    ${car.price.toLocaleString()}
                  </p>
                  <Link to={`../cars/${car._id}`}>
                    <Button
                      variant="outline"
                      size={"sm"}
                      className="w-full mt-1 text-sm border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-zinc-800"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
    </div>
  );
}
