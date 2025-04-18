import React, { useRef, useEffect } from "react";

const CanvasDots = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const dpr = window.devicePixelRatio;

        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);

        const dotRadius = 1;

        const dotSpacingX = 15;
        const dotSpacingY = 15;

        const drawDots = () => {
          for (let x = 0; x < canvas.width; x += dotSpacingX) {
            for (let y = 0; y < canvas.height; y += dotSpacingY) {
              ctx.beginPath();
              ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
              ctx.fillStyle = "#818181";
              ctx.fill();
            }
          }
        };

        drawDots();
        const handleResize = () => {
          canvas.width = window.innerWidth * dpr;
          canvas.height = window.innerHeight * dpr;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.scale(dpr, dpr);
          drawDots();
        };

        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }
    } else {
      console.error("Canvas element not found.");
    }
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="h-screen w-screen fixed inset-0 -z-10 bg-black"
    />
  );
};

export default CanvasDots;
