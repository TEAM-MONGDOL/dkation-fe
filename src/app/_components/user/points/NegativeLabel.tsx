import UserTextLabelAtom from '../common/atoms/UserTextLabelAtom';

interface NegativeLabelProps {
  text: string;
}

const NegativeLabel = ({ text }: NegativeLabelProps) => {
  return (
    <div className="flex items-center justify-center">
      <UserTextLabelAtom
        size="sm"
        className="bg-negative/10 text-negative"
        text={text}
      />
    </div>
  );
};

export default NegativeLabel;
