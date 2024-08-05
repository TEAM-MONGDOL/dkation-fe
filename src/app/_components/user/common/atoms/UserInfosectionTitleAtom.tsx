interface UserInfosectionTitleAtomProps {
  title: string;
}

const UserInfosectionTitleAtom = ({ title }: UserInfosectionTitleAtomProps) => {
  return (
    <div className="flex h-[72px] w-[161px] items-center bg-sub-100/30 text-3 text-sub-400">
      {title}
    </div>
  );
};

export default UserInfosectionTitleAtom;
