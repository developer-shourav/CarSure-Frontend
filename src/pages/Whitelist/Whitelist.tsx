import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { addToCart } from "@/redux/features/cart/cartSlice";
import toast from "react-hot-toast";
import useWhitelist from "@/hooks/useWhitelist";

export default function WhitelistPage() {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(selectCurrentUser);
  const userId = loggedInUser?.userId;

  const { whitelist, removeFromWhitelist } = useWhitelist();

  const handleAddToCart = (item: any) => {
    if (userId) {
      dispatch(addToCart({ userId, item: { ...item, quantity: 1 } }));
      toast.success("Added to cart");
    } else {
      toast.error("Please login to add to cart");
    }
  };

  const handleRemoveFromWhitelist = (id: string) => {
    removeFromWhitelist(id);
    toast.success("Removed from whitelist");
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 mt-[62px] lg:mt-[116px]">
      <h2 className="text-3xl font-bold mb-6">Your Whitelist</h2>

      {whitelist.length === 0 ? (
        <p>Your whitelist is empty.</p>
      ) : (
        <div className="space-y-6">
          {whitelist.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  className="h-20 w-20 object-cover rounded"
                  alt={item.name}
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>${item.price}</p>
                </div>
              </div>
              <div>
                <Button
                  onClick={() => handleAddToCart(item)}
                  className="bg-blue-600 hover:bg-blue-700 text-white me-2"
                  size="sm"
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={() => handleRemoveFromWhitelist(item.id)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                  size="sm"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
