import { useEffect, useState } from "react";

export default function AutoSlider({ images = [], interval = 3000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images.length) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  if (!images.length) return null;

  return (
    <div className="w-full h-40 overflow-hidden rounded relative">
      {images.map((img, i) => (
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
