import React, { useEffect, useRef } from "react";

function Arrow({ x, y }) {
  const canvasRef = useRef(null);
  const [startX, startY] = x;
  const [endX, endY] = y;
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
    const angle = Math.atan2(endY - startY, endX - startX);

    // Draw the arrowhead
    const arrowSize = 10;
    context.beginPath();
    context.moveTo(endX, endY);
    context.lineTo(
      endX - arrowSize * Math.cos(angle - Math.PI / 6),
      endY - arrowSize * Math.sin(angle - Math.PI / 6)
    );
    context.lineTo(
      endX - arrowSize * Math.cos(angle + Math.PI / 6),
      endY - arrowSize * Math.sin(angle + Math.PI / 6)
    );
    context.closePath();
    context.fill();
  }, [x, y]);

  return <canvas ref={canvasRef} width={300} height={100}></canvas>;
}

export default Arrow;
