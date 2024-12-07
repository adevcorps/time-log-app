'use client';

import { useState, useRef } from "react";
import Image from "next/image";
import progressImg from './images/progress.png';

export default function Home() {
  const [activeColor, setActiveColor] = useState("#22c55e"); // Default green
  const [isDragging, setIsDragging] = useState(false); // Track dragging state
  const [loggerPieces, setLoggerPieces] = useState(new Array(144).fill("#ccc")); // Initial colors for logger pieces

  const logPanRef = useRef(null);

  const handleMouseDown = (index) => {
    setIsDragging(true);
    if (logPanRef.current) {
      document.body.style.overflow = "hidden";
      logPanRef.current.style.overflowY = "hidden"; // Disable vertical scroll for the log pan
    }
    changeColor(index); // Change color of the logger piece
  };

  const handleMouseEnter = (index) => {
    if (isDragging) {
      changeColor(index); // Change color while dragging
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (logPanRef.current) {
      document.body.style.overflow = "";
      logPanRef.current.style.overflowY = "scroll"; // Re-enable vertical scroll for the log pan
    }
  };

  const changeColor = (index) => {
    const loggerPiece = document.getElementById(`logger-piece-${index}`);
    if (loggerPiece) {
      loggerPiece.style.backgroundColor = activeColor;
    }
  };


  const timeLabels = Array.from(
    { length: 49 },
    (_, i) => `${String(Math.floor(i / 2)).padStart(2, "0")}:${i % 2 === 0 ? "00" : "30"}`
  );

  return (
    <div className="w-full bg-[#4B86AA0D]">
      <div className="container pt-[80px] px-3 max-w-5xl text-center mx-auto bg-[rgba(75, 134, 170, 0.05)]">
        <p className="font-rubik font-[600] text-[#00000033] text-[10px] leading-[11.85px] tracking-[0.25rem] mb-[10px]">
          YOUR SLEEPLOG FOR
        </p>
        <p className="font-rubik font-[500] text-[#4B86AA] text-[22px] leading-[26.07px] mb-[10px]">
          Last night
        </p>
        <div className="w-full flex justify-center items-center py-[10px] mb-[20px]">
          <Image src={progressImg} alt="Progress image" width={88} height={12} />
        </div>
        <div className="w-full bg-[#FFFFFF] h-[600px] rounded-[10px] px-[33px] py-[28.4px]">
          <p className="font-rubik font-[500] text-[#4B86AA] text-[16px] leading-[26.07px] mb-[10px]">Did you wake up in between?</p>
          <p className="font-sourceSans font-[500] text-[12px] leading-[15.6px] mb-[80px]">Click on one of the pencils to color parts of the time bar, and indicate when you were sleeping.</p>
          <div id="log-pan" className="h-[400px]" ref={logPanRef}>
            <div
              className="min-h-screen  flex items-center justify-end"
              onMouseUp={handleMouseUp}
              onTouchEnd={handleMouseUp}
            >
              <div className="absolute left-[33px] bottom-[79px] flex flex-col space-y-4 ">
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
              <div className="flex items-start">
                <div className="flex flex-col items-end pr-4" style={{ height: `calc(3 * 1rem + 2 * 0.335rem)` }}>
                  {timeLabels.map((time, index) => (
                    <div key={index} className="text-sm text-gray-500" style={{ height: `calc(3 * 1rem + 2 * 0.335rem)` }}>
                      {time}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center">
                  {loggerPieces.map((_, index) => (
                    <div
                      key={index}
                      id={`logger-piece-${index}`}
                      className="w-16 h-4 bg-gray-300 mb-1 cursor-pointer rounded-[3px]"
                      onMouseDown={() => handleMouseDown(index)}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onTouchStart={() => handleMouseDown(index)}
                      onTouchMove={(e) => {
                        const element = document.elementFromPoint(
                          e.touches[0].clientX,
                          e.touches[0].clientY
                        );
                        if (element && element.id.includes("logger-piece-")) {
                          const touchIndex = parseInt(element.id.split("-").pop());
                          handleMouseEnter(touchIndex);
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
