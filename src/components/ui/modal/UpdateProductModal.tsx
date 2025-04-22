import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TCar } from "@/types";
import { useEffect } from "react";
import { useUpdateProductMutation } from "@/redux/features/product/productManagement.api";
import { successTheme } from "@/styles/toastThemes";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import CustomModal from "@/components/CustomModal";

type Props = {
  open: boolean;
  onClose: () => void;
  carData: TCar | null;
};

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
const categories = ["sports", "convertible", "suv", "coupe", "sedan"];

export default function UpdateProductModal({ open, onClose, carData }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<TCar>();



  useEffect(() => {
    if (carData) reset(carData);
  }, [carData, reset]);

  const [updateProduct, { isSuccess, isError, error, data }] = useUpdateProductMutation();

  const onSubmit = async (data: TCar) => {
    try {
      await updateProduct({ id: carData?._id, data });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product updated successfully!", successTheme);
      onClose();
    }
    if (isError) {
      toast.error("Failed to update product");
    }
  }, [isSuccess, isError]);

  console.log( { isSuccess, isError, error, data });

  return (
    <CustomModal open={open} onClose={onClose} title="Update Product">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label className="mb-1">Car Name</Label>
          <Input
            className="dark:border-1 dark:border-[#0000004d]"
            {...register("carName")}
            placeholder="Car Name"
          />
        </div>

        <div>
          <Label className="mb-1">Brand</Label>
          <select
            {...register("brand")}
            className="w-full border p-2 rounded-md dark:border-1 dark:border-[#0000004d]"
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
          <Label className="mb-1">Model</Label>
          <select
            {...register("model")}
            className="w-full border p-2 rounded-md dark:border-1 dark:border-[#0000004d]"
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
          <Label className="mb-1">Category</Label>
          <select
            {...register("category")}
            className="w-full border p-2 rounded-md dark:border-1 dark:border-[#0000004d]"
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
          <Label className="mb-1">Year</Label>
          <Input
            className="dark:border-1 dark:border-[#0000004d]"
            {...register("year")}
            type="number"
            placeholder="Year"
          />
        </div>

        <div>
          <Label className="mb-1">Price</Label>
          <Input
            className="dark:border-1 dark:border-[#0000004d]"
            {...register("price")}
            type="number"
            placeholder="Price"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="inStock"
            {...register("inStock")}
            className="h-4 w-4"
          />
          <Label htmlFor="inStock">In Stock</Label>
        </div>

        <div className="text-right">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </CustomModal>
  );
}
