import { useEffect, useRef, useState } from "react";

export default function AutoClickSlider({ images = [], interval = 3000 }) {
  const [index, setIndex] = useState(0);
  const autoPlayTimer = useRef(null);

  // ---- Auto Scroll ----
  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [index, images.length]);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayTimer.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
  };

  const stopAutoPlay = () => {
    if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
  };

  // ---- Go to next / previous ----
  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () =>
    setIndex((i) => (i - 1 + images.length) % images.length);

  // ---- Pause when pressing mouse, resume when released ----
  const handleMouseDown = () => stopAutoPlay();
  const handleMouseUp = () => startAutoPlay();

  if (!images.length) return null;

  return (
    <div
      className="relative w-full h-110 overflow-hidden rounded select-none"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Images */}
      {images.map((img, i) => (
        <img
          key={i}
          src={img.url}
          alt={img.alt || "image"}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Left click zone */}
      <div
        onClick={prev}
        className="absolute top-0 left-0 h-full w-1/2 z-10 cursor-pointer"
      />

      {/* Right click zone */}
      <div
        onClick={next}
        className="absolute top-0 right-0 h-full w-1/2 z-10 cursor-pointer"
      />

      {/* Optional arrow icons (visible on hover) */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl opacity-40 hover:opacity-80 pointer-events-none">
        ◀
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl opacity-40 hover:opacity-80 pointer-events-none">
        ▶
      </div>
    </div>
  );
}
