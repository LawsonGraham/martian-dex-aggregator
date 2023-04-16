import React, { useEffect, useRef } from "react";
import "./ShootingStarBackground.css";

const ShootingStarBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const starCount = 150;
    const stars = [];

    // Create the stars
    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 3;

      stars.push({
        x,
        y,
        size,
      });
    }

    // Draw the stars
    function draw() {
        context.clearRect(0, 0, width, height);
      
        stars.forEach((star) => {
          context.beginPath();
          context.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
          context.fillStyle = "#ff5e5e";
          context.fill();
      
          // Add a shooting star effect
          if (Math.random() > 0.999) {
            context.beginPath();
            context.moveTo(star.x, star.y);
            context.lineTo(star.x + star.size * 15, star.y + star.size * 15);
            context.strokeStyle = "#ff5e5e";
            context.stroke();
          }
        });
      
        requestAnimationFrame(draw);
      }

    // Start the animation loop
    draw();
  }, []);

  return <canvas className="shooting-star-background" ref={canvasRef} />;
};

export default ShootingStarBackground;
