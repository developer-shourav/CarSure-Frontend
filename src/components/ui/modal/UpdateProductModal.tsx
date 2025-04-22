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
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<TCar>();

  const quantity = watch("quantity");
  const inStock = watch("inStock");

  useEffect(() => {
    if (carData) reset(carData);
  }, [carData, reset]);

  const [updateProduct, { isSuccess, isError }] = useUpdateProductMutation();

  // Handle form logic before submit
  const onSubmit = async (data: TCar) => {
    try {
      const updatedData = {
        ...data,
        price: Number(data.price),
        year: Number(data.year),
        quantity: Number(data.quantity),
        inStock: data.quantity > 0 && data.inStock !== false, // ensure consistency
      };
      await updateProduct({ id: carData?._id, data: updatedData });
    } catch (err) {
      console.error(err);
    }
  };

  // Auto uncheck inStock if quantity is 0
  useEffect(() => {
    if (Number(quantity) <= 0) {
      setValue("inStock", false);
    } else {
      setValue("inStock", true);
    }
  }, [quantity, setValue]);

  // Auto set quantity to 0 if inStock is unchecked
  useEffect(() => {
    if (!inStock) {
      setValue("quantity", 0);
    }
  }, [inStock, setValue]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product updated successfully!", successTheme);
      onClose();
    }
    if (isError) {
      toast.error("Failed to update product");
    }
  }, [isSuccess, isError]);

  return (
    <CustomModal open={open} onClose={onClose} title="Update Product">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label className="mb-2">Car Name</Label>
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
            <Label className="mb-2">Model</Label>
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
            <Label className="mb-2">Category</Label>
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
              {...register("quantity")}
              type="number"
              placeholder="Quantity"
            />
          </div>
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
          <Button
            className="dark:bg-red-500 hover:text-white hover:bg-red-600"
            size="sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </CustomModal>
  );
}
