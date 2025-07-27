"use client";

import React from "react";

interface MagnitudeModalProps {
  tempMagnitude: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onApply: () => void;
  onCancel: () => void;
  onManualChange: (value: number) => void;
}

const MagnitudeModal: React.FC<MagnitudeModalProps> = ({
  tempMagnitude,
  onIncrease,
  onDecrease,
  onApply,
  onCancel,
  onManualChange
}) => {
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    if (e.deltaY < 0) {
      onIncrease();
    } else {
      onDecrease();
    }
  };

  return (
    <div
      className="
        absolute inset-0 bg-black/50 backdrop-blur-sm
        flex items-center justify-center z-50
      "
      onClick={onCancel}
    >
      <div
        className="bg-gray-800 rounded-xl p-6 border border-gray-600 shadow-2xl w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg text-yellow-400 font-bold mb-4 text-center">
          Ρύθμιση Ρίχτερ
        </h2>
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <input
              type="number"
              step="0.1"
              min="0"
              max="7"
              value={tempMagnitude}
              onChange={(e) => onManualChange(parseFloat(e.target.value))}
              onWheel={handleWheel}
              className="
                text-3xl font-bold text-yellow-400
                bg-gray-900 px-4 py-2 rounded-lg
                border border-gray-700 shadow-inner
                text-center w-32
                appearance-none
                focus:outline-none
                [&::-webkit-inner-spin-button]:appearance-none
                [&::-webkit-outer-spin-button]:appearance-none
              "
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={onApply}
              className="
                bg-yellow-600 text-gray-900 font-semibold px-4 py-1 rounded
                hover:bg-yellow-700 transition duration-300
              "
            >
              Εφαρμογή
            </button>
            <button
              onClick={onCancel}
              className="
                bg-gray-600 text-gray-300 px-4 py-1 rounded
                hover:bg-gray-500 transition duration-300
              "
            >
              Άκυρο
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagnitudeModal;
