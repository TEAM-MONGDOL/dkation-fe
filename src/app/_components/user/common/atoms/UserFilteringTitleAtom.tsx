interface UserFilteringTitleAtomProps {
  text: string;
}

const UserFilteringTitleAtom = ({ text }: UserFilteringTitleAtomProps) => {
  return <span className="text-2 font-semibold text-sub-400">{text}</span>;
};

export default UserFilteringTitleAtom;
