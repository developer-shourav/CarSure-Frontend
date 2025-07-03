import { useState } from "react";

function ProductDescription({ description }: { description: string }) {
  const [showFull, setShowFull] = useState(false);

  const toggleDescription = () => {
    setShowFull((prev) => !prev);
  };

  const isLong = description.length > 800;
  const shortText = description.slice(0, 800);

  return (
    <div className="mt-10 w-full">
      <h2 className="text-red-500 font-bold text-xl mb-3">Product details</h2>
      <p className="text-gray-600 font-medium text-sm lg:text-[15px] dark:text-gray-300 text-justify">
        {isLong ? (
          <>
            {showFull ? description : `${shortText}`}
            <button
              onClick={toggleDescription}
              className="text-red-500 font-semibold text-sm lg:text-[15px]  ml-1"
            >
              {showFull ? "Read less" : "Read more..."}
            </button>
          </>
        ) : (
          description
        )}
      </p>
    </div>
  );
}

export default ProductDescription;
