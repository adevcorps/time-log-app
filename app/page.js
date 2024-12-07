'use client';

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import progressImg from './images/progress.png';
// import penCilIcon from './images/pencil.svg';

export default function Home() {
  const [activeColor, setActiveColor] = useState(""); // Default green
  const [isDragging, setIsDragging] = useState(false); // Track dragging state
  const [loggerPieces, setLoggerPieces] = useState(new Array(141).fill("#ccc")); // Initial colors for logger pieces
  const [isButtonClicked, setIsButtonClikced] = useState({
    out: false,
    awake: false,
    sleep: false
  });
  const logPanRef = useRef(null);

  const handleChangeButtonBorder = (color, kind) => {
    let tmpState = {
      out: false,
      awake: false,
      sleep: false
    }
  
    tmpState[kind]=true;
    console.log(tmpState)
    setIsButtonClikced(tmpState)
    setActiveColor(color)
  }
  useEffect(() => {
    logPanRef.current.style.overflowY = "hidden";
  }, [])
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
    console.log(index)
    const loggerPiece = document.getElementById(`logger-piece-${index}`);
    if (loggerPiece) {
      loggerPiece.style.backgroundColor = activeColor;
    }
  };


  const timeLabels = Array.from(
    { length: 48 },
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
                <div className={`flex w-[120px] items-center gap-4`} onClick={() => handleChangeButtonBorder("#0000001A", 'out')}>
                  <button
                    className={`w-[32px] h-[32px] bg-[#0000001A] rounded-full flex justify-center items-center ${isButtonClicked['out'] ? 'border-2 border-[#4B86AA]' : ''}`}
                  ><Image src={'./images/pencil.svg'} alt="Pencil Icon" width={15} height={15} /></button>
                  <span className="font-sourceSans font-[400] text-[#2C2C2C] text-[12px] leading-[15.6px]">Out of bed</span>
                </div>
                <div className="flex w-[120px] items-center gap-4" onClick={() => handleChangeButtonBorder("#4B86AA4D", 'awake')}>
                  <button
                    className={`w-[32px] h-[32px] bg-[#4B86AA4D] rounded-full flex justify-center items-center ${isButtonClicked['awake'] ? 'border-2 border-[#4B86AA]' : ''}`}
                  ><Image src={'./images/pencil.svg'} alt="Pencil Icon" width={15} height={15} /></button>
                  <span className="font-sourceSans font-[400] text-[#2C2C2C] text-[12px] leading-[15.6px]">Awake in bed</span>
                </div>
                <div className="flex w-[120px] items-center gap-4" onClick={() => handleChangeButtonBorder("#BBE600", 'sleep')}>
                  <button
                    className={`w-[32px] h-[32px] bg-[#BBE600] rounded-full flex justify-center items-center ${isButtonClicked['sleep'] ? 'border-2 border-[#4B86AA]' : ''}`}
                  ><Image src={'./images/pencil.svg'} alt="Pencil Icon" width={15} height={15} /></button>
                  <span className="font-sourceSans font-[400] text-[#2C2C2C] text-[12px] leading-[15.6px]">Sleep in bed</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex flex-col items-end pr-4">
                  {timeLabels.map((time, index) => (
                    <div key={index} className="font-sourceSans font-[400] text-[#4B86AAB2] text-[13px]" style={{ height: `calc(3 * 1rem + 2 * 0.335rem)` }}>
                      {time}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center">
                  {loggerPieces.map((_, index) => (
                    <div
                      key={index}
                      id={`logger-piece-${index}`}
                      className="w-16 h-4 bg-[#0000001A] mb-1 cursor-pointer rounded-[3px]"
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
