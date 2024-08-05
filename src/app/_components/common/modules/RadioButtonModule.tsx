import RadioButtonAtom from '@/_components/common/atoms/RadioButtonAtom';

interface RadioButtonModuleProps {
  option: string;
  isClicked: boolean;
  onClick: () => void;
}

const RadioButtonModule = ({
  option,
  isClicked,
  onClick,
}: {
  option: string;
  isClicked: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className="flex w-full items-center justify-start gap-x-2.5 bg-white py-[5px] text-4"
      onClick={onClick}
    >
      <RadioButtonAtom isChecked={isClicked} />
      <div
        className={`${isClicked ? 'font-medium text-sub-300' : 'text-sub-200'}`}
      >
        {option}
      </div>
    </button>
  );
};

export default RadioButtonModule;
