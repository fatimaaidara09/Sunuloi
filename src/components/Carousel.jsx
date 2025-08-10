// src/components/Carousel.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Carousel({ items, renderItem, interval = 5000 }) {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Effet autoplay
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setIndex((prev) => (prev + 1) % items.length),
      interval
    );
    return () => resetTimeout();
  }, [index, items.length, interval]);

  const prev = () => {
    resetTimeout();
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };
  const next = () => {
    resetTimeout();
    setIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${index * 100}%)` }}
        onMouseEnter={resetTimeout}
        onMouseLeave={() => {
          timeoutRef.current = setTimeout(
            () => setIndex((prev) => (prev + 1) % items.length),
            interval
          );
        }}
      >
        {items.map((item, i) => (
          <div key={i} className="min-w-full">
            {renderItem(item, i)}
          </div>
        ))}
      </div>

      {/* Flèches */}
      <button
        onClick={prev}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition"
      >
        <FaChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              resetTimeout();
              setIndex(i);
            }}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-green-700" : "bg-green-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
