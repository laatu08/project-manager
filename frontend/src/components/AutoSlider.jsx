import { useEffect, useState } from "react";

export default function AutoSlider({ images = [], interval = 3000 }) {
  // Use only first 3 images if there are more than 3
  const displayedImages = images.length > 3 ? images.slice(0, 3) : images;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!displayedImages.length) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % displayedImages.length);
    }, interval);

    return () => clearInterval(timer);
  }, [displayedImages, interval]);

  if (!displayedImages.length) return null;

  return (
    <div className="w-full h-52 overflow-hidden rounded relative">
      {displayedImages.map((img, i) => (
        <img
          key={i}
          src={img.url}
          className={`
            absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700
            ${i === index ? "opacity-100" : "opacity-0"}
          `}
        />
      ))}
    </div>
  );
}
