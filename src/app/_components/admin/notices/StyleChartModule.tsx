import React from 'react';
import { BannerStyleType, colorClassConverter } from '@/_types/adminType';

interface ColorChartModuleProps {
  selectedColor: BannerStyleType;
  onSelectColor: (color: BannerStyleType) => void;
  colorOptions: BannerStyleType[];
}

const ColorChartModule = ({
  selectedColor,
  onSelectColor,
  colorOptions,
}: ColorChartModuleProps) => {
  return (
    <div className="flex gap-4">
      {colorOptions.map((option) => {
        const backgroundClass = colorClassConverter[option];

        return (
          <button
            key={option}
            type="button"
            onClick={() => onSelectColor(option)}
            className={`flex items-center justify-center gap-x-3 rounded-full border-2 bg-cus-100 px-4 py-2 ${
              selectedColor === option
                ? 'border-positive/10 bg-positive/20'
                : 'border-transparent'
            }`}
          >
            <span>{option}</span>
            <div className={`h-4 w-4 rounded-full ${backgroundClass}`} />
          </button>
        );
      })}
    </div>
  );
};

export default ColorChartModule;
