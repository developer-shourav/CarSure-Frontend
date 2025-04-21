import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TCar } from "@/types";
import { useEffect } from "react";
import { useUpdateProductMutation } from "@/redux/features/product/productManagement.api";
import { successTheme } from "@/styles/toastThemes";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";

type Props = {
  open: boolean;
  onClose: () => void;
  carData: TCar | null;
  refetch: () => void;
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

export default function UpdateProductModal({ open, onClose, carData, refetch }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<TCar>();

  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (carData) {
      reset(carData);
    }
  }, [carData, reset]);

  const onSubmit = async (data: TCar) => {
    try {
      await updateProduct({ id: carData?._id, body: data }).unwrap();
      toast.success("Product updated successfully!", successTheme);
      refetch();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Car Name</Label>
            <Input {...register("carName")} placeholder="Car Name" />
          </div>

          <div>
            <Label>Brand</Label>
            <select {...register("brand")} className="w-full border p-2 rounded-md">
              <option value="">Select brand</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Model</Label>
            <select {...register("model")} className="w-full border p-2 rounded-md">
              <option value="">Select model</option>
              {models.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Category</Label>
            <select {...register("category")} className="w-full border p-2 rounded-md">
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Year</Label>
            <Input {...register("year")} type="number" placeholder="Year" />
          </div>

          <div>
            <Label>Price</Label>
            <Input {...register("price")} type="number" placeholder="Price" />
          </div>

          <div>
            <Label>Product Image URL</Label>
            <Input {...register("productImg")} placeholder="Image URL" />
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
      </DialogContent>
    </Dialog>
  );
}
