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
      className={`flex items-center justify-center rounded-lg border px-4 py-1.5 text-4 ${isClicked ? 'border-primary bg-primary/10 text-primary' : 'border-sub-100 bg-sub-100/10 text-sub-100'}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default DatePickerTagAtom;
