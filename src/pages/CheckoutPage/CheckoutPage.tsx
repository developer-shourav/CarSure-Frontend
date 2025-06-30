/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeFromCart } from "@/redux/features/cart/cartSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useCreateOrderMutation } from "@/redux/features/order/order";
import { useForm } from "react-hook-form";
import { successTheme } from "@/styles/toastThemes";

export default function CheckoutPage() {
  const { state } = useLocation();
  const singleItem = state?.item;

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const userId = currentUser?.userId;
  const user = userId;
  const carId = singleItem?.id as string;

  const [ip, setIp] = useState("");

  const [createOrder, { isLoading, isSuccess, data, isError, error }] =
    useCreateOrderMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const res = await fetch("https://api.ipify.org/?format=json");
        const data = await res.json();
        setIp(data?.ip);
      } catch (err) {
        console.error("IP fetch failed", err);
      }
    };
    fetchIP();
  }, []);

  const onSubmit = async (formData: any) => {
    if (!singleItem || !user) return;

    const orderPayload = {
      user,
      carId,
      quantity: singleItem.quantity,
      totalPrice: singleItem.price * singleItem.quantity,
      customerInfo: {
        ...formData,
        userIP: ip,
      },
    };

    await createOrder(orderPayload);
    dispatch(removeFromCart({ userId: user, id: singleItem.id }));
  };
   

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message, successTheme);
      if (data?.data) {
        setTimeout(() => {
          window.location.href = data.data;
        }, 1000);
      }
    }

    if (isError) toast.error(JSON.stringify(error));
  }, [data?.data, data?.message, error, isError, isSuccess]);

  if (!singleItem) {
    return (
      <div className="max-w-xl mx-auto py-10 px-4 mt-[62px] lg:mt-[116px]">
        <p className="text-red-600">No item selected for checkout.</p>
      </div>
    );
  }

  const total = singleItem.price * singleItem.quantity;

  return (
    <div className="max-w-xl mx-auto py-10 px-4 space-y-6 mt-[62px] lg:mt-[116px]">
      <h2 className="text-3xl font-bold">Checkout</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <Input
            {...register("name", { required: true })}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <Input
            {...register("email", { required: true })}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone Number</label>
          <Input
            {...register("phone", { required: true })}
            placeholder="Enter your phone"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">Phone is required</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">City</label>
          <Input
            {...register("city", { required: true })}
            placeholder="Enter your city"
          />
          {errors.city && (
            <p className="text-red-500 text-sm">City is required</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Delivery Address</label>
          <Input
            {...register("address", { required: true })}
            placeholder="Enter your address"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">Address is required</p>
          )}
        </div>

        {/* ----------- Order Summary ----------- */}
        <div className="border p-4 rounded bg-muted">
          <p className="font-semibold text-lg">{singleItem.name}</p>
          <p className="text-gray-700">
            ${singleItem.price} x {singleItem.quantity}
          </p>
          <p className="mt-2 font-bold text-lg">
            Total: ${total.toLocaleString()}
          </p>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-red-600 text-white hover:bg-red-700 w-full"
        >
          {isLoading ? "Order processing.." : "Order Now"}
        </Button>
      </form>
    </div>
  );
}
