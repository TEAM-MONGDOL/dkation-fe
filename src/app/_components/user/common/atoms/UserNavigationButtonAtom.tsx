import Image from 'next/image';

interface NavigationButtonAtomProps {
  text: string;
  iconSrc: string;
  onClick: () => void;
}

const UserNavigationButtonAtom = ({
  text,
  iconSrc,
  onClick,
}: NavigationButtonAtomProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-5 py-3 text-3 text-sub-400"
    >
      <div className="flex gap-10 pr-4">
        <p> {text}</p>
        <Image src={iconSrc} alt={text} className="mr-2" />
      </div>
      <div className="h-4 border-l border-l-sub-100" />
    </button>
  );
};

export default UserNavigationButtonAtom;
