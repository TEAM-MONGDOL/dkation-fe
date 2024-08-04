interface UserTableHeaderAtomProps {
  text: string;
  width?: string;
  isFirst?: boolean;
  isLast?: boolean;
}

const UserTableHeaderAtom = ({
  text,
  width,
  isFirst,
  isLast,
}: UserTableHeaderAtomProps) => {
  return (
    <th
      className={`px-5 text-center align-middle text-4 font-normal text-sub-300 ${isFirst ? 'rounded-l pl-[68px]' : ''} ${isLast ? 'rounded-r pr-[68px]' : ''}`}
      style={{ width }}
    >
      {text}
    </th>
  );
};

export default UserTableHeaderAtom;
