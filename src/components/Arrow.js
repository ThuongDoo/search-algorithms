import React from "react";
import "../styles.css";
function Arrow({ x, y, value }) {
  const [startX, startY] = x;
  const [endX, endY] = y;
  const valueX = (startX + endX) / 2;
  const valueY = (startY + endY) / 2;
  return (
    <svg className="arrow">
      <defs>
        <marker
          id="arrow"
          markerWidth="10"
          markerHeight="10"
          refX="20"
          refY="5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L10,5 L0,10 Z" fill="black" />
        </marker>
      </defs>
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="black"
        strokeWidth="2"
        markerEnd="url(#arrow)"
      />
      <rect
        x={valueX - 15}
        y={valueY - 18}
        width="30"
        height="30"
        fill="white"
      />
      <text
        x={valueX}
        y={valueY}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="black"
        fontSize={28}
        fontWeight={900}
      >
        {value}
      </text>
    </svg>
  );
}

export default Arrow;
