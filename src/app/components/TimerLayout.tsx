"use client";
import React, {useState} from "react";
import Timer from "./Timer";
import SpotifyAuth from "./SpotifyAuth";

// Define durations for Pomodoro, Short Break, and Long Break
const sessionTypes = {
  pomodoro: {duration: 1500, label: "Pomodoro"}, // 25 min
  shortBreak: {duration: 300, label: "Short Break"}, // 5 min
  longBreak: {duration: 600, label: "Long Break"}, // 10 min
};

const TimerLayout: React.FC = () => {
  const [selectedSessionType, setSelectedSessionType] = useState(
    sessionTypes.pomodoro
  );
  const [isActive, setIsActive] = useState(false);
  const [completedSessions, setCompletedSessions] = useState<number[]>([]); // Store completed sessions

  const handleNextSession = () => {
    setCompletedSessions((prev) => [...prev, selectedSessionType.duration]); // Mark current session as complete
  };

  const resetSession = () => {
    setIsActive(false);
    setCompletedSessions([]); // Clear completed sessions
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8f0e3] text-gray-800 font-quicksand">
      {/* Pomodoro, Short Break, Long Break Buttons */}
      <div className="flex space-x-6 mb-0">
        <button
          className={`py-1 px-5 rounded-full ${
            selectedSessionType.label === "Pomodoro"
              ? "bg-white text-gray-700"
              : "bg-transparent border border-gray-300"
          } hover:bg-white transition duration-300 text-xl`}
          onClick={() => setSelectedSessionType(sessionTypes.pomodoro)}
        >
          Pomodoro
        </button>
        <button
          className={`py-1 px-5 rounded-full ${
            selectedSessionType.label === "Short Break"
              ? "bg-white text-gray-700"
              : "bg-transparent border border-gray-300"
          } hover:bg-white transition duration-300 text-xl`}
          onClick={() => setSelectedSessionType(sessionTypes.shortBreak)}
        >
          Short Break
        </button>
        <button
          className={`py-1 px-5 rounded-full ${
            selectedSessionType.label === "Long Break"
              ? "bg-white text-gray-700"
              : "bg-transparent border border-gray-300"
          } hover:bg-white transition duration-300 text-xl`}
          onClick={() => setSelectedSessionType(sessionTypes.longBreak)}
        >
          Long Break
        </button>
      </div>

      {/* Session Timeline */}
      <div className="flex w-full max-w-lg space-x-2 mb-10">
        {/* For each session, show a progress indicator */}
        {Array(8)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className={`transition-transform transform hover:scale-105 ${
                completedSessions.includes(index)
                  ? "bg-[#ffb6b9] w-16 h-6"
                  : "bg-[#fbe8e7] w-16 h-6"
              } rounded-full`}
            />
          ))}
      </div>

      {/* Timer Circle Container */}
      <div className="relative flex items-center justify-center w-96 h-96 rounded-full ">
        <Timer
          duration={selectedSessionType.duration}
          label={selectedSessionType.label}
          onComplete={handleNextSession}
          isActive={isActive}
          setIsActive={setIsActive}
          key={selectedSessionType.label} // Adding key to re-render on session type change
        />
      </div>

      {/* Start/Pause and Reset Buttons */}
      <div className="flex space-x-4 mt-8">
        <button
          className="bg-transparent border border-gray-300 text-gray-800 py-1 px-5 rounded-full shadow-lg hover:bg-white transition duration-300 text-xl"
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          className="bg-transparent border border-gray-300 text-gray-800 py-1 px-5 rounded-full shadow-lg hover:bg-white transition duration-300 text-xl"
          onClick={resetSession}
        >
          Reset
        </button>
      </div>

      <SpotifyAuth />

      {/* Spotify Connect Button */}
      {/* <button className="mt-10 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition duration-300">
        Connect with Spotify
      </button> */}
    </div>
  );
};

export default TimerLayout;
