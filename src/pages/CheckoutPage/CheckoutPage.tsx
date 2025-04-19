import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeFromCart } from "@/redux/features/cart/cartSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

export default function CheckoutPage() {
  const { state } = useLocation();
  const singleItem = state?.item;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentUser = useAppSelector(selectCurrentUser);
  const userId = currentUser?.userId;

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  if (!singleItem) {
    return (
      <div className="max-w-xl mx-auto py-10 px-4">
        <p className="text-red-600">No item selected for checkout.</p>
      </div>
    );
  }

  const total = singleItem.price * singleItem.quantity;

  const handleCheckout = () => {
    if (!address.trim()) {
      toast.error("Please provide a delivery address.");
      return;
    }

    // TODO: Send `singleItem`, `userId`, `address`, and `paymentMethod` to backend here
    console.log("Order Info:", {
      userId,
      item: singleItem,
      address,
      paymentMethod,
    });

    // ----------- Remove the item from cart after order
    if (userId) {
      dispatch(removeFromCart({ userId, id: singleItem.id }));
    }

    toast.success("Order placed successfully!");
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4 space-y-6">
      <h2 className="text-3xl font-bold">Checkout</h2>

      <div>
        <label className="block mb-1 font-medium">Delivery Address</label>
        <Input
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="COD">Cash on Delivery</option>
          <option value="Card">Credit/Debit Card</option>
        </select>
      </div>

      {/* ----------- Item Summary -----------*/}
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
        onClick={handleCheckout}
        className="bg-red-600 text-white hover:bg-red-700 w-full"
      >
        Place Order
      </Button>
    </div>
  );
}
