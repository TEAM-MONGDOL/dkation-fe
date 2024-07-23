interface DatePickerTagProps {
  text: string;
  isClicked: boolean;
  onClick: () => void;
}

const DatePickerTagAtom = ({
  text,
  isClicked,
  onClick,
}: DatePickerTagProps) => {
  return (
    <button
      className={`flex items-center justify-center px-4 py-1.5 rounded-lg text-4 border ${isClicked ? 'border-primary text-primary bg-primary/10' : 'border-sub-100 text-sub-100 bg-sub-100/10'}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default DatePickerTagAtom;
