'use client'

import Image from "next/image";
import { useState, useRef } from "react";

export default function Home() {
  const [activeColor, setActiveColor] = useState(null); // Tracks the active pencil color
  const isDragging = useRef(false); // Tracks dragging state
  const timeBarRef = useRef(null);
  const handleDrag = (e) => {
    if (!isDragging.current || !activeColor) return;

    const elements = document.elementsFromPoint(
      e.clientX || e.touches[0]?.clientX,
      e.clientY || e.touches[0]?.clientY
    );

    elements.forEach((el) => {
      if (el.classList.contains("time-segment")) {
        el.style.backgroundColor = activeColor;
      }
    });
  };



  return (
     <div className="relative min-h-screen bg-gray-100">
      {/* Fixed pencil container */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 flex space-x-4 z-50">
        <button
          className="w-10 h-10 bg-green-500 rounded-full"
          onClick={() => setActiveColor("green")}
        />
        <button
          className="w-10 h-10 bg-blue-500 rounded-full"
          onClick={() => setActiveColor("blue")}
        />
        <button
          className="w-10 h-10 bg-yellow-500 rounded-full"
          onClick={() => setActiveColor("yellow")}
        />
      </div>

      {/* Time bar */}
      <div
        className="mt-20 mx-auto w-full max-w-md"
        ref={timeBarRef}
        onMouseDown={() => (isDragging.current = true)}
        onMouseUp={() => (isDragging.current = false)}
        onMouseMove={handleDrag}
        onTouchStart={() => (isDragging.current = true)}
        onTouchEnd={() => (isDragging.current = false)}
        onTouchMove={handleDrag}
      >
        <div className="grid grid-cols-24 border border-gray-300">
          {Array.from({ length: 24 }).map((_, idx) => (
            <div
              key={idx}
              className="time-segment h-10 border-r border-gray-200"
              style={{ backgroundColor: "white" }}
            ></div>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="mt-10 text-center text-gray-600">
        {Array.from({ length: 20 }).map((_, idx) => (
          <p key={idx} className="mb-4">
            Scrollable content line {idx + 1}.
          </p>
        ))}
      </div>
    </div>
  );
}
