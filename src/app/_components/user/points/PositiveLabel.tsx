import UserTextLabelAtom from '../common/atoms/UserTextLabelAtom';

interface PositiveLabelProps {
  text: string;
}

const PositiveLabel = ({ text }: PositiveLabelProps) => {
  return (
    <div className="flex w-full items-center justify-center">
      <UserTextLabelAtom
        size="sm"
        className="bg-positive/10 text-positive"
        text={text}
      />
    </div>
  );
};

export default PositiveLabel;
