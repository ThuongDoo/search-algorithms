import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
function Node({
  name,
  nodeValue,
  parentRef,
  radius,
  index,
  initialPostition,
  onPositionChange,
}) {
  const [mouseX, setMouseX] = useState(initialPostition[0]);
  const [mouseY, setMouseY] = useState(initialPostition[1]);
  const parentElement = parentRef.current;
  const handleMouseMove = (e) => {
    let newX = e.clientX;
    let newY = e.clientY;
    const parentStyle = getComputedStyle(parentElement);
    const parentWidth = parseInt(parentStyle.width, 10);
    const parentHeight = parseInt(parentStyle.height, 10);
    if (newX < radius) newX = radius;
    if (newX > parentWidth - radius) newX = parentWidth - radius;
    if (newY < radius) newY = radius;
    if (newY > parentHeight - radius) newY = parentHeight - radius;
    setMouseX(newX);
    setMouseY(newY);
    onPositionChange({ index: index, position: [newX, newY] });
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
        left: mouseX - radius + "px",
        top: mouseY - radius + "px",
        width: radius * 2 + "px",
        height: radius * 2 + "px",
      }}
      onMouseDown={handleMouseDown}
    >
      <h1>{name}</h1>
      <hr />
      <h1>{nodeValue}</h1>
    </div>
  );
}

export default Node;
