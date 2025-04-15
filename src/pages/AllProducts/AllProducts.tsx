import { useGetAllProductsQuery } from "@/redux/features/productManagement.api";
import SectionWrapper from "@/components/ui/wrapper/SectionWrapper";
import { WebsiteHeading } from "@/components/ui/WebsiteHeading/WebsiteHeading";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { TQueryParam } from "@/types";
import { useState } from "react";

export default function AllProducts() {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const {
    data: carResponse,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery(
    [
      { name: "limit", value: "12" },
      { name: "page", value: page },
      { name: "sortOrder", value: "asc" },
      ...params,
    ],
    {
      pollingInterval: 300000,
    }
  );

  const isLoadingState = isLoading || isFetching;
  const cars = carResponse?.data;
  const metaData = carResponse?.meta;

  return (
    <section className="w-full min-h-[90vh] py-16 bg-zinc-50 dark:bg-zinc-950 mb-12 lg:mb-20">
      <SectionWrapper>
        <WebsiteHeading title="All Cars" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {isLoadingState
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow"
                >
                  <Skeleton className="w-full h-52" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-9 w-full rounded-md" />
                  </div>
                </div>
              ))
            : cars?.map((car) => (
                <div
                  key={car._id}
                  className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
                >
                  <img
                    src={car.productImg}
                    alt={car.carName}
                    loading="lazy"
                    className="w-full h-52 object-cover"
                  />
                  <div className="p-4 space-y-1">
                    <h3 className="text-lg font-semibold text-black dark:text-white">
                      {car.carName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Brand: {car.brand}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Model: {car.model}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      Category: {car.category}
                    </p>
                    <p className="text-red-600 font-bold text-lg">
                      ${car.price.toLocaleString()}
                    </p>

                    <Button
                      variant="outline"
                      className="w-full mt-2 text-sm border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-zinc-800"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
        </div>
      </SectionWrapper>
    </section>
  );
}
