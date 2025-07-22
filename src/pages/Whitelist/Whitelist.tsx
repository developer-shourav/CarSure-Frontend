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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <div className="max-w-5xl mx-auto py-10 px-4 mt-[62px] lg:mt-[116px] min-h-[80vh]">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Your Whitelist</h2>

      {whitelist.length === 0 ? (
        <p className="text-gray-600">Your whitelist is empty.</p>
      ) : (
        <div className="space-y-4">
          {whitelist.map((item) => (
            <div
              key={item.id}
              className="flex flex-row  justify-between md:items-center gap-2 border p-2 rounded-lg shadow-sm"
            >
              <div className="flex items-start gap-2 w-8/12 ">
                <img
                  src={item.image}
                  className="h-20 w-20 object-cover rounded"
                  alt={item.name}
                />
                <div>
                  <p className="font-semibold text-base sm:text-lg">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-600">${item.price}</p>
                </div>
              </div>

              <div className="flex  flex-col md:flex-row md:justify-end gap-2 w-4/12">
                <Button
                  onClick={() => handleAddToCart(item)}
                  size="sm"
                  className=""
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={() => handleRemoveFromWhitelist(item.id)}
                  size="sm"
                  className=" bg-red-600 hover:bg-red-700 text-white"
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
