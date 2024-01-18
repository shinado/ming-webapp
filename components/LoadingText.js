// Filename: RotatingText.js
import React, { useState, useEffect } from "react";
import "../app/globals.css";
import { Preview } from "@mui/icons-material";

const LoadingText = ({ textArray }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex == textArray.length - 1 ? prevIndex : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(intervalId);
  }, [textArray.length]);

  return (
    <div
      key={currentIndex}
      className="text-2xl font-bold text-center fadeInOut"
    >
      {textArray[currentIndex]}
    </div>
  );
};

export default LoadingText;
