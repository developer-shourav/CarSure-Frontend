import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAddProductMutation } from "@/redux/features/product/productManagement.api";
import toast from "react-hot-toast";
import { useState } from "react";
import { TCar, TCarCategory } from "@/types";
import { Plus } from "lucide-react";
import DashboardBodyWrapper from "@/components/ui/wrapper/DashboardBodyWrapper";
import { DashboardHeading } from "@/components/ui/WebsiteHeading/DashboardHeading";

const brands = [
  "BMW",
  "Bugatti",
  "Mercedes-Benz",
  "Audi",
  "Honda",
  "Bentley",
  "Hyundai",
  "Ford",
];
const models = [
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
];
const categories: TCarCategory[] = [
  "sports",
  "convertible",
  "suv",
  "coupe",
  "sedan",
];

export default function AddNewProduct() {
  const [uploadingIds, setUploadingIds] = useState<number[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<TCar>();

  const quantity = watch("quantity");
  const inStock = watch("inStock");

  const [addCar] = useAddProductMutation();

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length) return;

    const newUploadingIds = files.map(() => Date.now() + Math.random());
    setUploadingIds((prev) => [...prev, ...newUploadingIds]);

    try {
      const urls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "CarSure_Nari");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dinnsayed/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const result = await res.json();
        urls.push(result.secure_url);
      }

      setUploadedUrls((prev) => [...prev, ...urls]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image(s).");
    } finally {
      setUploadingIds((prev) =>
        prev.filter((id) => !newUploadingIds.includes(id))
      );
    }
  };

  const onSubmit = async (data: TCar) => {
    if (!uploadedUrls.length)
      return toast.error("Please upload at least one image.");

    try {
      const carToAdd: TCar = {
        ...data,
        year: Number(data.year),
        price: Number(data.price),
        quantity: Number(data.quantity),
        productImg: uploadedUrls,
        inStock: data.quantity > 0 && data.inStock,
        description: data.description,
      };

      await addCar(carToAdd).unwrap();

      toast.success("Car added successfully!");
      reset();
      setUploadedUrls([]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add car.");
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setValue("quantity", val);
    if (val === 0) setValue("inStock", false);
    else if (inStock === false) setValue("inStock", true);
  };

  const handleInStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setValue("inStock", checked);
    if (!checked) setValue("quantity", 0);
    else if (quantity === 0) setValue("quantity", 1);
  };

  return (
    <DashboardBodyWrapper>
      <DashboardHeading title="Add New Car" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 max-w-2xl space-y-6"
        noValidate
      >
        {/* Image uploader */}
        <div className="flex flex-wrap gap-4">
          {uploadedUrls.map((url, index) => (
            <div
              key={`uploaded-${index}`}
              className="w-32 h-32 border rounded-md overflow-hidden relative"
            >
              <img
                src={url}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {uploadingIds.map((id) => (
            <div
              key={`uploading-${id}`}
              className="w-32 h-32 border rounded-md flex items-center justify-center animate-pulse bg-gray-100 dark:bg-zinc-800"
            >
              <span className="text-gray-600 text-xs">Uploading...</span>
            </div>
          ))}

          <label className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition">
            <Plus className="w-6 h-6 text-gray-500" />
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageSelect}
            />
          </label>
        </div>

        {/* Car details */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="mb-2">Car Name</Label>
            <Input
              className="dark:border-[#0000004d]"
              {...register("carName", { required: "Car name is required" })}
              placeholder="Car Name"
            />
            {errors.carName && (
              <p className="text-red-500 text-sm">{errors.carName.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-2">Brand</Label>
            <Select
              onValueChange={(value) => setValue("brand", value)}
              {...register("brand", { required: "Brand is required" })}
            >
              <SelectTrigger className="w-full dark:border-[#0000004d]">
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.brand && (
              <p className="text-red-500 text-sm">{errors.brand.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-2">Model</Label>
            <Select
              onValueChange={(value) => setValue("model", value)}
              {...register("model", { required: "Model is required" })}
            >
              <SelectTrigger className="w-full dark:border-[#0000004d]">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.model && (
              <p className="text-red-500 text-sm">{errors.model.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-2">Category</Label>
            <Select
              onValueChange={(value) => setValue("category", value)}
              {...register("category", { required: "Category is required" })}
            >
              <SelectTrigger className="w-full dark:border-[#0000004d]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-2">Year</Label>
            <Input
              className="dark:border-[#0000004d]"
              type="number"
              {...register("year", { required: "Year is required" })}
              placeholder="Year"
            />
            {errors.year && (
              <p className="text-red-500 text-sm">{errors.year.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-2">Price</Label>
            <Input
              className="dark:border-[#0000004d]"
              type="number"
              {...register("price", { required: "Price is required" })}
              placeholder="Price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-2">Quantity</Label>
            <Input
              className="dark:border-[#0000004d]"
              type="number"
              {...register("quantity", { required: "Quantity is required" })}
              onChange={handleQuantityChange}
              placeholder="Quantity"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("inStock", { required: "Stock status is required" })}
            onChange={handleInStockChange}
          />
          <Label>In Stock</Label>
          {errors.inStock && (
            <p className="text-red-500 text-sm">{errors.inStock.message}</p>
          )}
        </div>

        <div>
          <Label className="mb-2">Description</Label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Write a short description about the car"
            className="w-full border p-2 rounded-md dark:border-[#0000004d]"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div className="text-right">
          <Button
            className="dark:bg-red-500 text-white hover:bg-red-600"
            size="sm"
            disabled={isSubmitting || uploadingIds.length > 0}
          >
            {isSubmitting || uploadingIds.length > 0 ? "Adding..." : "Add Car"}
          </Button>
        </div>
      </form>
    </DashboardBodyWrapper>
  );
}