interface ColorChartModuleProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const ColorChartModule = ({
  selectedColor,
  onSelectColor,
}: ColorChartModuleProps) => {
  return (
    <div className="flex gap-4">
      {['Dark', 'Lightgray', 'Yellow'].map((option) => {
        const backgroundClass =
          option === 'Dark'
            ? 'bg-sub-300'
            : option === 'Lightgray'
              ? 'bg-sub-100'
              : 'bg-primary';

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
