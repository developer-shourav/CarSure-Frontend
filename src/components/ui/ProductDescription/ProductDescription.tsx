import { useState } from "react";

function ProductDescription({ description }: { description: string }) {
  const [showFull, setShowFull] = useState(false);

  const toggleDescription = () => {
    setShowFull((prev) => !prev);
  };

  const isLong = description.length > 450;
  const shortText = description.slice(0, 450);

  return (
    <div className="mt-10 w-[90%] lg:w-[90%] xl:w-[80%]">
      <h2 className="text-red-500 font-bold text-xl mb-3">Features details</h2>
      <p className="text-gray-600 dark:text-gray-300 text-justify">
        {isLong ? (
          <>
            {showFull ? description : `${shortText}`}
            <button
              onClick={toggleDescription}
              className="text-red-500 font-semibold text-sm  ml-1"
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
