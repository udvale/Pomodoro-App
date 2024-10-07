"use client";
import React, {useState, useEffect} from "react";
import {CircularProgressbar, buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface TimerProps {
  duration: number;
  label: string;
  onComplete: () => void; // Callback when timer completes
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Timer: React.FC<TimerProps> = ({
  duration,
  label,
  onComplete,
  isActive,
  setIsActive,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  const percentage = (timeLeft / duration) * 100;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false); // Stop timer
      onComplete(); // Move to next session when timer ends
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, onComplete, setIsActive]);

  const handleReset = () => {
    setTimeLeft(duration);
    setIsActive(false);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Timer Label Above Timer */}
      <h2 className="text-2xl font-semibold mb-4 text-[#8b4513]">{label}</h2>

      {/* Circular Timer Display */}
      <div className="w-72 h-72 flex items-center justify-center">
        <CircularProgressbar
          value={percentage}
          text={`${Math.floor(timeLeft / 60)
            .toString()
            .padStart(2, "0")}:${(timeLeft % 60).toString().padStart(2, "0")}`}
          styles={buildStyles({
            textColor: "#8b4513", // Dark brown for readability
            pathColor: "#8b4513",
            trailColor: "#e0e0e0",
          })}
        />
      </div>
    </div>
  );
};

export default Timer;
