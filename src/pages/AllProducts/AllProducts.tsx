import { useGetAllProductsQuery } from "@/redux/features/productManagement.api";
import SectionWrapper from "@/components/ui/wrapper/SectionWrapper";
import { WebsiteHeading } from "@/components/ui/WebsiteHeading/WebsiteHeading";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { TCar, TMeta, TQueryParam } from "@/types";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AllProducts() {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [page, setPage] = useState(1);

  const buildParams = () => {
    const filters: TQueryParam[] = [];

    if (search) filters.push({ name: "search", value: search });
    if (availability) filters.push({ name: "inStock", value: availability });
    if (priceRange[0]) filters.push({ name: "minPrice", value: priceRange[0] });
    if (priceRange[1]) filters.push({ name: "maxPrice", value: priceRange[1] });

    setParams([
      { name: "limit", value: "12" },
      { name: "page", value: page },
      { name: "sortOrder", value: "asc" },
      ...filters,
    ]);
  };

  useEffect(() => {
    buildParams();
  }, [search, availability, priceRange, page]);

  const {
    data: carResponse,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery(params, {
    pollingInterval: 300000,
  });

  const isLoadingState = isLoading || isFetching;
  const cars = carResponse?.data as TCar[];
  const metaData = carResponse?.meta as TMeta;

  return (
    <section className="w-full min-h-[90vh] py-16 bg-zinc-50 dark:bg-zinc-950 mb-12 lg:mb-20">
      <SectionWrapper>
        <WebsiteHeading title="All Cars" />

        {/* --- Filters --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Input
            placeholder="Search by brand, name or category"
            className="w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* ------------Filter Fields------------ */}
          <Select onValueChange={(val) => setAvailability(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">In Stock</SelectItem>
              <SelectItem value="false">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
          <div className="space-y-1">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </p>
            <Slider
              defaultValue={[0, 100000]}
              min={0}
              max={100000}
              step={1000}
              value={priceRange}
              onValueChange={(val) => setPriceRange(val as [number, number])}
            />
          </div>
        </div>

        {/* --- Product Cards --- */}
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

        {/* --- Pagination --- */}
        <div className="flex justify-center items-center gap-3 mt-10">
          <Button
            variant="outline"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </Button>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Page {page} of {metaData?.totalPage || 1}
          </p>
          <Button
            variant="outline"
            onClick={() =>
              setPage((prev) =>
                metaData?.totalPage
                  ? Math.min(prev + 1, metaData.totalPage)
                  : prev
              )
            }
            disabled={page === metaData?.totalPage}
          >
            Next
          </Button>
        </div>
      </SectionWrapper>
    </section>
  );
}
