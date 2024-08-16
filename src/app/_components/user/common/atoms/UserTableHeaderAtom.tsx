interface UserTableHeaderAtomProps {
  text: string;
  width?: string;
  isFirst?: boolean;
  isLast?: boolean;
  textAlign?: 'left' | 'center' | 'right';
}

const UserTableHeaderAtom = ({
  text,
  width,
  isFirst,
  isLast,
  textAlign = 'center',
}: UserTableHeaderAtomProps) => {
  return (
    <th
      className={`px-5 py-2.5 ${textAlign === 'center' ? 'text-center' : textAlign === 'left' ? 'text-start' : 'text-end'} align-middle text-4 font-normal text-sub-300 ${isFirst ? 'rounded-l pl-6 xl:pl-10' : ''} ${isLast ? 'rounded-r pr-6 xl:pr-10' : ''}`}
      style={{ width }}
    >
      {text}
    </th>
  );
};

export default UserTableHeaderAtom;
