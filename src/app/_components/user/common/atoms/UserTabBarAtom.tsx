interface UserTabBarAtomProps {
  text: string;
  isActive: boolean;
  onClick: () => void;
}

const UserTabBarAtom = ({ text, isActive, onClick }: UserTabBarAtomProps) => {
  return (
    <div
      role="presentation"
      className={`flex h-full cursor-pointer items-center justify-center border-b-[5px] font-bold transition-all duration-150 ${isActive ? 'border-primary text-sub-400' : 'border-transparent text-sub-100'}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default UserTabBarAtom;
