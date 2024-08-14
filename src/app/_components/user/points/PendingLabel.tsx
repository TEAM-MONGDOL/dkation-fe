interface PendingLabelProps {
  text: string;
}

const PendingLabel = ({ text }: PendingLabelProps) => {
  return <div className="text-center font-medium text-sub-200">{text}</div>;
};

export default PendingLabel;
