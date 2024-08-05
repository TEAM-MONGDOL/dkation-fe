interface UserDateTagAtomProps {
  text: string;
  isClicked: boolean;
  onClick: () => void;
}

const UserDateTagAtom = ({
  text,
  isClicked,
  onClick,
}: UserDateTagAtomProps) => {
  return (
    <button
      className={`flex items-center justify-center rounded-md border px-4 py-0.5 font-medium ${isClicked ? 'border-primary bg-primary/10 text-primary' : 'border-sub-100 bg-sub-100/10 text-sub-200'}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default UserDateTagAtom;
