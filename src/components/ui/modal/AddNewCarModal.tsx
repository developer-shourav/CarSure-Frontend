import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAddProductMutation } from "@/redux/features/product/productManagement.api";
import toast from "react-hot-toast";
import { useState } from "react";
import { TCar, TCarCategory } from "@/types";
import CustomModal from "@/components/CustomModal";
import { Plus } from "lucide-react";

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

export default function AddNewCarModal() {
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

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

  const onSubmit = async (data: TCar) => {
    if (!imageFile) return toast.error("Please select a car image.");

    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "CarSure_Nari");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dinnsayed/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();
      const imageUrl = result.secure_url;

      const carToAdd: TCar = {
        ...data,
        year: Number(data.year),
        price: Number(data.price),
        quantity: Number(data.quantity),
        productImg: imageUrl,
        inStock: data.quantity > 0 && data.inStock,
        description: data.description,
      };

      await addCar(carToAdd).unwrap();

      toast.success("Car added successfully!");
      reset();
      setImageFile(null);
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add car");
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
    <>
      <div className="flex justify-end">
        <Button
          className="dark:bg-red-500 dark:text-white dark:hover:text-black dark:hover:bg-white hover:bg-red-600"
          onClick={() => setOpen(true)}
        >
          <Plus /> Add New Car
        </Button>
      </div>

      <CustomModal
        open={open}
        onClose={() => setOpen(false)}
        title="Add New Car"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label className="mb-2">Car Name</Label>
            <Input
              className="dark:border-1 dark:border-[#0000004d]"
              {...register("carName", { required: "Car name is required" })}
              placeholder="Car Name"
            />
            {errors.carName && (
              <p className="text-red-500 text-sm">{errors.carName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="mb-2">Brand</Label>
              <select
                {...register("brand", { required: "Brand is required" })}
                className="w-full border p-2 rounded-md dark:border-[#0000004d]"
              >
                <option value="">Select brand</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              {errors.brand && (
                <p className="text-red-500 text-sm">{errors.brand.message}</p>
              )}
            </div>

            <div>
              <Label className="mb-2">Model</Label>
              <select
                {...register("model", { required: "Model is required" })}
                className="w-full border p-2 rounded-md dark:border-[#0000004d]"
              >
                <option value="">Select model</option>
                {models.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              {errors.model && (
                <p className="text-red-500 text-sm">{errors.model.message}</p>
              )}
            </div>

            <div>
              <Label className="mb-2">Category</Label>
              <select
                {...register("category", {
                  required: "Category is required",
                })}
                className="w-full border p-2 rounded-md dark:border-[#0000004d]"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <Label className="mb-2">Year</Label>
              <Input
                className="dark:border-1 dark:border-[#0000004d]"
                {...register("year", { required: "Year is required" })}
                type="number"
                placeholder="Year"
              />
              {errors.year && (
                <p className="text-red-500 text-sm">{errors.year.message}</p>
              )}
            </div>

            <div>
              <Label className="mb-2">Price</Label>
              <Input
                className="dark:border-1 dark:border-[#0000004d]"
                {...register("price", { required: "Price is required" })}
                type="number"
                placeholder="Price"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>

            <div>
              <Label className="mb-2">Quantity</Label>
              <Input
                className="dark:border-1 dark:border-[#0000004d]"
                type="number"
                {...register("quantity", { required: "Quantity is required" })}
                onChange={handleQuantityChange}
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm">
                  {errors.quantity.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("inStock", { required: "Stock status is required" })}
              onChange={handleInStockChange}
            />
            <Label className="">In Stock</Label>
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
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label className="mb-2">Image</Label>
            <Input
              className="dark:text-black dark:border-1 dark:border-[#0000004d]"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
          </div>

          <div className="text-right">
            <Button
              className="dark:bg-red-500 text-white hover:bg-red-600"
              size="sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Car"}
            </Button>
          </div>
        </form>
      </CustomModal>
    </>
  );
}
