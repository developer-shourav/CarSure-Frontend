import { useGetAllProductsQuery } from "@/redux/features/product/productManagement.api";
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
import { Link } from "react-router-dom";
import { Star, StarHalf, Heart } from "lucide-react";
import PublicPageWrapper from "@/components/ui/wrapper/PublicPageWrapper";

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

  /* --------Fetch filter options --------*/
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
    refetchOnReconnect: true,
  });

  const isLoadingState = isLoading || isFetching;
  const cars = carResponse?.data as TCar[];
  const metaData = carResponse?.meta as TMeta;

  return (
    <PublicPageWrapper>
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
            <div className="lg:hidden">
              <Sheet open={showFilterSheet} onOpenChange={setShowFilterSheet}>
                <SheetTrigger asChild>
                  <Button variant="outline">Filter</Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[220px] lg:w-[340px] overflow-y-auto"
                >
                  <div className="flex items-center justify-between mt-8">
                    <SheetHeader>
                      <SheetTitle className="text-lg">Filter Cars</SheetTitle>
                    </SheetHeader>
                    {/* --------Reset Button-------- */}

                    <SheetTrigger asChild>
                      <Button
                        variant={"link"}
                        size={"sm"}
                        className="text-xs text-red-600 pointer"
                        onClick={resetFilters}
                      >
                        Reset Filters
                      </Button>
                    </SheetTrigger>
                  </div>

                  <div className="mt-6 space-y-6 p-4">
                    {/* --------Price Range --------*/}
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

                    {/* --------Filters --------*/}
                    {(
                      Object.keys(filterData) as (keyof typeof filterData)[]
                    ).map((key) => (
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
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* ----------Filter Area--------------- */}
          <div className="hidden  lg:block space-y-6 p-4 bg-accent rounded-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white ">
                Filters{" "}
              </h2>
              {/* --------Reset Button-------- */}

              <Button
                variant={"link"}
                size={"sm"}
                className="text-xs text-red-600 pointer"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
            {/* --------Price Range --------*/}
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Price Range
              </p>
              <Slider
                min={0}
                max={1000000}
                step={1000}
                value={priceRange}
                onValueChange={(val) => setPriceRange(val as [number, number])}
              />
              <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                ${priceRange[0]} - ${priceRange[1]}
              </p>
            </div>

            {/* --------Filters --------*/}
            {(Object.keys(filterData) as (keyof typeof filterData)[]).map(
              (key) => {
                return (
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
                );
              }
            )}
          </div>
          <div className="col-span-3">
            {/* --- Result Count --- */}
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Showing {cars?.length || 0} of {metaData?.total || 0} results
            </p>

            {/* --- Product Grid --- */}
            <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4  gap-3 md:gap-y-6 md:gap-x-3">
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
                        {/* --------Heart Icon --------*/}
                        <button
                          title="Add to favorite"
                          className="absolute top-2 right-3 z-10 p-1 hidden group-hover:block bg-white  rounded-full"
                        >
                          <Heart className="size-5 text-black  hover:text-pink-600" />
                        </button>
                        <div className="flex flex-col justify-between h-full">
                          <div>
                            <div className="relative">
                              <img
                                src={car.productImg[0]}
                                alt={car.carName}
                                loading="lazy"
                                className="w-full h-40 object-cover group-hover:scale-110 transition duration-300"
                              />
                              {!car.inStock && (
                                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">
                                  Out of Stock
                                </span>
                              )}
                            </div>
                            <div className="p-2">
                              <h3 className="text-lg font-semibold text-black dark:text-white">
                                {car.carName}
                              </h3>
                            </div>
                          </div>
                          <div className="p-2 space-y-[2px]">
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
                                  <Star
                                    key={idx}
                                    size={13}
                                    className="text-gray-300"
                                  />
                                )
                              )}{" "}
                              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                {car.rating}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Brand: {car.brand}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Model: {car.model}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                              Category: {car.category}
                            </p>
                            <p className="text-red-600 font-bold text-[15px]">
                              ${car.price.toLocaleString()}
                            </p>
                            <Link to={`./${car._id}`} className="mt-auto">
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
                      </div>
                    );
                  })}
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
          </div>
        </div>
      </SectionWrapper>
    </PublicPageWrapper>
  );
}
