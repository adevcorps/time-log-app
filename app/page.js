'use client'

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [activeColor, setActiveColor] = useState("#22c55e"); // Default green
  const [isDragging, setIsDragging] = useState(false); // Track dragging state
  const loggerPieces = new Array(24).fill(null); // 24 pieces for example

  const handleMouseDown = (index) => {
    setIsDragging(true);
    changeColor(index);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseEnter = (index) => {
    if (isDragging) {
      changeColor(index);
    }
  };

  const changeColor = (index) => {
    const piece = document.getElementById(`logger-piece-${index}`);
    if (piece) {
      piece.style.backgroundColor = activeColor;
    }
  };

  return (
    <div className="w-full bg-[rgba(75, 134, 170, 0.05)]">
      <div className="container py-[80px]	px-3 max-w-5xl text-center mx-auto bg-[rgba(75, 134, 170, 0.05)]">
        <p className="font-rubik font-[600] text-[#00000033] text-[10px] leading-[11.85px] tracking-[0.25rem] mb-[10px]">YOUR SLEEPLOG FOR</p>
        <p className="font-rubik font-[500] text-[#4B86AA] text-[22px] leading-[26.07px] mb-[10px]">Last night</p>
        
        <div
          className="relative min-h-screen  flex items-center justify-center"
          onMouseUp={handleMouseUp} // Stop dragging when mouse is released
          onTouchEnd={handleMouseUp} // Stop dragging for touch
        >
          {/* Fixed Pencil Selector */}
          <div className="absolute top-5 left-5 space-y-4">
            <button
              className="w-8 h-8 bg-green-500 rounded-full"
              onClick={() => setActiveColor("#22c55e")}
            />
            <button
              className="w-8 h-8 bg-blue-500 rounded-full"
              onClick={() => setActiveColor("#3b82f6")}
            />
            <button
              className="w-8 h-8 bg-gray-500 rounded-full"
              onClick={() => setActiveColor("#6b7280")}
            />
          </div>

          {/* Time Logger Bar */}
          <div className="flex flex-col items-center">
            {loggerPieces.map((_, index) => (
              <div
                key={index}
                id={`logger-piece-${index}`}
                className="w-16 h-4 bg-gray-300 mb-1 cursor-pointer"
                onMouseDown={() => handleMouseDown(index)} // Start dragging
                onMouseEnter={() => handleMouseEnter(index)} // Change color while dragging
                onTouchStart={() => handleMouseDown(index)} // Touch support
                onTouchMove={(e) => {
                  const element = document.elementFromPoint(
                    e.touches[0].clientX,
                    e.touches[0].clientY
                  );
                  if (element && element.id.includes("logger-piece-")) {
                    const touchIndex = parseInt(element.id.split("-").pop());
                    handleMouseEnter(touchIndex);
                  }
                }} // Change color for touch drag
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
