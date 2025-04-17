import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const cart = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handleCheckout = () => {
    // You’d send order info to backend here

    dispatch(clearCart());
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
          onChange={e => setAddress(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={e => setPaymentMethod(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="COD">Cash on Delivery</option>
          <option value="Card">Credit/Debit Card</option>
          {/* You can integrate real payments here */}
        </select>
      </div>

      <div>
        <h4 className="text-xl font-semibold">Total: ${cart.items.reduce((a, i) => a + i.price * i.quantity, 0).toLocaleString()}</h4>
      </div>

      <Button onClick={handleCheckout} className="bg-red-600 text-white hover:bg-red-700 w-full">
        Place Order
      </Button>
    </div>
  );
}
