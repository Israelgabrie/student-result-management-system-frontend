import { useEffect, useState } from "react";
import { BookOpen, BarChart2 } from "lucide-react"; // Make sure these are imported correctly
import PulseLoader from "react-spinners/PulseLoader";

export default function LoadingScreen() {
  const [loadingProgress, setLoadingProgress] = useState(200);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="h-screen w-full bg-black flex flex-col items-center justify-center text-white overflow-hidden"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        paddingTop:"15%"
      }}
    >
      {/* University Logo and Name */}
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <BookOpen className="h-16 w-16 animate-pulse text-white" />
            <BarChart2 className="h-10 w-10 absolute bottom-0 right-0 text-gray-300" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          MOUNTAIN TOP UNIVERSITY
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mt-2">
            <PulseLoader color="white" size={15} />
          Student Result Management System
        </p>
      </div>

      {/* Loading Animation */}
      <div className="relative w-64 md:w-80 h-1 bg-gray-800 rounded-full overflow-hidden mb-8">
        <div
          className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-300 ease-out"
          style={{ width: `${loadingProgress}%` }}
        />
      </div>

      {/* Loading Text */}
      <div className="flex items-center space-x-4">
        <div className="loading-spinner">
          <div className="h-8 w-8 border-4 border-t-white border-r-gray-800 border-b-gray-800 border-l-gray-800 rounded-full animate-spin" />
        </div>
        <p className="text-lg font-medium">
          {loadingProgress < 100 ? "Loading system..." : "Ready!"}
        </p>
      </div>

      {/* Animated Dots */}
      <div className="mt-16 flex space-x-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-3 w-3 bg-white rounded-full animate-bounce"
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: "1s",
            }}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-sm text-gray-500">
        © {new Date().getFullYear()} Mountain Top University. All rights
        reserved.
      </div>
    </div>
  );
}
