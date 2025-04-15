import { useGetAllProductsQuery } from "@/redux/features/productManagement.api";
import SectionWrapper from "@/components/ui/wrapper/SectionWrapper";
import { WebsiteHeading } from "@/components/ui/WebsiteHeading/WebsiteHeading";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TCar, TMeta, TQueryParam } from "@/types";
import { useEffect, useState } from "react";

export default function AllProducts() {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showFilterSheet, setShowFilterSheet] = useState(false);

  const [filters, setFilters] = useState({
    brand: [] as string[],
    model: [] as string[],
    category: [] as string[],
    inStock: [] as string[],
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);

  // Fetch filter options
  const filterData = {
    brand: [
      "BMW",
      "Bugatti",
      "Mercedes-Benz",
      "Audi",
      "Honda",
      "Bentley",
      "Hyundai",
      "Ford",
    ],
    model: [
      "LAMB",
      "Z4",
      "Bronco",
      "SL",
      "Continental",
      "Kona",
      "Elantra",
      "C-Class",
      "i4",
      "F-150",
    ],
    category: ["sports", "convertible", "suv", "coupe", "sedan"],
    inStock: ["true", "false"],
  };

  const handleCheckboxChange = (type: keyof typeof filters, value: string) => {
    setFilters((prev) => {
      const selected = prev[type];
      const exists = selected.includes(value);
      return {
        ...prev,
        [type]: exists
          ? selected.filter((v) => v !== value)
          : [...selected, value],
      };
    });
  };

  const resetFilters = () => {
    setFilters({
      brand: [],
      model: [],
      category: [],
      inStock: [],
    });
    setPriceRange([0, 1000000]);
  };

  const buildParams = () => {
    const p: TQueryParam[] = [
      { name: "limit", value: "12" },
      { name: "page", value: page },
      { name: "sortOrder", value: "asc" },
    ];
    if (search) p.push({ name: "search", value: search });
    if (priceRange[0]) p.push({ name: "minPrice", value: priceRange[0] });
    if (priceRange[1]) p.push({ name: "maxPrice", value: priceRange[1] });

    Object.entries(filters).forEach(([key, values]) => {
      values.forEach((value) => {
        p.push({ name: key, value });
      });
    });

    setParams(p);
  };

  useEffect(() => {
    buildParams();
  }, [search, filters, priceRange, page]);

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

        {/* --- Search & Filter Header --- */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-4 w-full sm:justify-end">
            <Input
              placeholder="🔍 Search by brand, name or category"
              className="w-full sm:max-w-xs"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <Sheet open={showFilterSheet} onOpenChange={setShowFilterSheet}>
              <SheetTrigger asChild>
                <Button variant="outline">Filter</Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[220px] lg:w-[340px] overflow-y-auto"
              >
                <SheetHeader>
                  <SheetTitle className="text-lg">Filter Cars</SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-6 p-4">
                  {/* Price Range */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Price Range
                    </p>
                    <Slider
                      min={0}
                      max={1000000}
                      step={1000}
                      value={priceRange}
                      onValueChange={(val) =>
                        setPriceRange(val as [number, number])
                      }
                    />
                    <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                      ${priceRange[0]} - ${priceRange[1]}
                    </p>
                  </div>

                  {/* Filters */}
                  {(Object.keys(filterData) as (keyof typeof filterData)[]).map(
                    (key) => (
                      <div key={key}>
                        <p className="text-sm font-semibold capitalize text-gray-700 dark:text-gray-300 mb-1">
                          {key}
                        </p>
                        <div className="space-y-1 max-h-40 overflow-y-auto pr-2">
                          {filterData[key]?.map((value: string) => (
                            <div
                              key={value}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`${key}-${value}`}
                                checked={filters[key]?.includes(value)}
                                onCheckedChange={() =>
                                  handleCheckboxChange(key, value)
                                }
                              />
                              <label
                                htmlFor={`${key}-${value}`}
                                className="text-sm capitalize text-gray-600 dark:text-gray-300"
                              >
                                {value === "true"
                                  ? "inStock"
                                  : value === "false"
                                  ? "out of stock"
                                  : value}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}

                  {/* Reset Button */}

                  <SheetTrigger asChild>
                    <Button
                      variant="destructive"
                      className="w-full mt-4"
                      onClick={resetFilters}
                    >
                      Reset Filters
                    </Button>
                  </SheetTrigger>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* --- Result Count --- */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Showing {cars?.length || 0} of {metaData?.total || 0} results
        </p>

        {/* --- Product Grid --- */}
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
