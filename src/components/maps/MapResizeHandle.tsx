"use client";

import React from "react";

interface MapResizeHandleProps {
  mapWidth: number;
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void; 
}

const MapResizeHandle: React.FC<MapResizeHandleProps> = ({
  mapWidth,
  onMouseDown,
  onTouchStart,
}) => {
  return (
    <div
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart} 
      className="absolute top-0 bottom-0 flex items-center justify-center"
      style={{
        left: `${mapWidth}%`,
        width: "16px",
        marginLeft: "-8px",
        zIndex: 1000,
        cursor: "ew-resize",
        backgroundColor: "transparent",
      }}
    >
      <div
        className="
          bg-gray-800
          border border-gray-700
          shadow-md
          hover:shadow-lg
          hover:scale-105
          transition-all
          duration-200
          ease-in-out
          relative
        "
        style={{
          width: "16px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "auto",
        }}
      >
        <div
          className="w-[2px] h-10 bg-gray-400"
          style={{
            background: "linear-gradient(to bottom, #555, #777)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default MapResizeHandle;
