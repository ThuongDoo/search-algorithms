import React, { useEffect, useRef, useState } from "react";

function Node({ name, index, parentRef, onPositionChange }) {
  const nodeRadius = 25;
  const [mouseX, setMouseX] = useState((index + 1) * 100);
  const [mouseY, setMouseY] = useState(100);
  const parentElement = parentRef.current;
  const handleMouseMove = (e) => {
    if (parentElement) {
      const parentStyle = getComputedStyle(parentElement);
      const parentWidth = parseInt(parentStyle.width, 10);
      const parentHeight = parseInt(parentStyle.height, 10);
      let newX = e.clientX;
      let newY = e.clientY;
      if (newX < nodeRadius) newX = nodeRadius;
      if (newX > parentWidth - nodeRadius) newX = parentWidth - nodeRadius;
      if (newY < nodeRadius) newY = nodeRadius;
      if (newY > parentHeight - nodeRadius) newY = parentHeight - nodeRadius;
      setMouseX(newX);
      setMouseY(newY);
      onPositionChange({ key: index, x: newX, y: newY });
    }
  };

  const handleMouseDown = (e) => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = (e) => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="node"
      style={{
        left: mouseX - nodeRadius + "px",
        top: mouseY - nodeRadius + "px",
      }}
      onMouseDown={handleMouseDown}
    >
      <h1>{name}</h1>
    </div>
  );
}

export default Node;
