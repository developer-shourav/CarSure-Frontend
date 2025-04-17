import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  updateQuantity,
  removeFromCart,
  applyCoupon,
} from "@/redux/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(selectCurrentUser);
  const userId = loggedInUser?.userId;

  // ✅ Access nested user cart properly
  const userCart = useAppSelector((state) =>
    userId
      ? state.cart.userCarts[userId] || { items: [], coupon: "" }
      : { items: [], coupon: "" }
  );

  const [couponCode, setCouponCode] = useState(userCart.coupon || "");

  const subtotal = userCart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {!userId ? (
        <p className="text-red-500">Please login to view your cart.</p>
      ) : userCart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {userCart.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    className="h-20 w-20 object-cover rounded"
                    alt={item.name}
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p>
                      ${item.price} x {item.quantity}
                    </p>
                    <div className="flex gap-2 mt-1 items-center">
                      <Button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              userId,
                              id: item.id,
                              quantity: Math.max(1, item.quantity - 1),
                            })
                          )
                        }
                        size="sm"
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              userId,
                              id: item.id,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        size="sm"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() =>
                    dispatch(removeFromCart({ userId, id: item.id }))
                  }
                  variant="destructive"
                  size="sm"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>

          {/* Coupon Field */}
          <div className="mt-6 flex gap-4">
            <Input
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
            />
            <Button
              onClick={() =>
                dispatch(applyCoupon({ userId, coupon: couponCode }))
              }
            >
              Apply
            </Button>
          </div>

          {/* Checkout Summary */}
          <div className="mt-10 border-t pt-6 flex justify-between items-center">
            <h4 className="text-xl font-bold">
              Total: ${subtotal.toLocaleString()}
            </h4>
            <Link to="/checkout">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
