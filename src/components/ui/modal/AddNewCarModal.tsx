import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAddProductMutation } from "@/redux/features/product/productManagement.api";
import toast from "react-hot-toast";
import { useState } from "react";
import { TCar, TCarCategory } from "@/types";
import CustomModal from "@/components/CustomModal";

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
    formState: { isSubmitting },
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
      <div className="flex justify-end" >
        <Button onClick={() => setOpen(true)}>Add New Car</Button>
      </div>

      <CustomModal
        open={open}
        onClose={() => setOpen(false)}
        title="Add New Car"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label className="mb-2 ">Car Name</Label>
            <Input
              className="dark:border-1 dark:border-[#0000004d]"
              {...register("carName")}
              placeholder="Car Name"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="mb-2">Brand</Label>
              <select
                {...register("brand")}
                className="w-full border p-2 rounded-md dark:border-[#0000004d]"
              >
                <option value="">Select brand</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label className="mb-2">Model</Label>
              <select
                {...register("model")}
                className="w-full border p-2 rounded-md dark:border-[#0000004d]"
              >
                <option value="">Select model</option>
                {models.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label className="mb-2">Category</Label>
              <select
                {...register("category")}
                className="w-full border p-2 rounded-md dark:border-[#0000004d]"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label className="mb-2">Year</Label>
              <Input
                className="dark:border-1 dark:border-[#0000004d]"
                {...register("year")}
                type="number"
                placeholder="Year"
              />
            </div>

            <div>
              <Label className="mb-2">Price</Label>
              <Input
                className="dark:border-1 dark:border-[#0000004d]"
                {...register("price")}
                type="number"
                placeholder="Price"
              />
            </div>

            <div>
              <Label className="mb-2">Quantity</Label>
              <Input
                className="dark:border-1 dark:border-[#0000004d]"
                type="number"
                {...register("quantity")}
                onChange={handleQuantityChange}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("inStock")}
              onChange={handleInStockChange}
            />
            <Label className="">In Stock</Label>
          </div>

          <div>
            <Label className="mb-2">Description</Label>
            <textarea
              {...register("description")}
              placeholder="Write a short description about the car"
              className="w-full border p-2 rounded-md dark:border-[#0000004d]"
            />
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Car"}
            </Button>
          </div>
        </form>
      </CustomModal>
    </>
  );
}
