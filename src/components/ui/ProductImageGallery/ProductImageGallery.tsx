import { useEffect, useState } from "react";

interface ProductImageGalleryProps {
  images: string[];
}

export default function ProductImageGallery({
  images,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);
  const [fade, setFade] = useState<boolean>(false);

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  const handleSelect = (img: string) => {
    if (img === selectedImage) return;
    setFade(true);
    setTimeout(() => {
      setSelectedImage(img);
      setFade(false);
    }, 200);
  };

  return (
    <div className="w-full mx-auto">
      {/* ---------Main Image--------- */}
      <div className="border rounded-lg overflow-hidden mb-4 relative">
        <img
          src={selectedImage}
          alt="Product"
          className={`w-full h-80 sm:h-96 object-contain transition-opacity duration-300 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      {/* ---------Thumbnails--------- */}
      <div className="flex flex-wrap gap-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(img)}
            className={`border-2 rounded-md overflow-hidden focus:outline-none transition duration-200 ${
              selectedImage === img
                ? "border-red-500"
                : "border-transparent hover:border-red-300"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className="size-16 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
