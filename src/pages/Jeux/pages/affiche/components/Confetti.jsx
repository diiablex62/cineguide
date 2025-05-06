import React, { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export default () => {
  const { width, height } = useWindowSize();
  const [dimensions, setDimensions] = useState({ width, height });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <Confetti width={dimensions.width} height={dimensions.height} />;
};
