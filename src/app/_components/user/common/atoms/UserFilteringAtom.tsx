import { FilterIcon, IsolationModeIcon } from '@/_assets/icons';
import Image from 'next/image';

interface UserFilteringAtomProps {
  type: 'FILTER' | 'SORT' | 'NOTICE';
  onClick: () => void;
}

const UserFilteringAtom = ({ type, onClick }: UserFilteringAtomProps) => {
  return (
    <button
      className="flex items-center justify-center gap-x-2.5 rounded-lg border border-sub-100 px-[14px] py-[7px]"
      onClick={onClick}
    >
      <Image
        src={type === 'SORT' ? IsolationModeIcon : FilterIcon}
        alt={type === 'SORT' ? 'sort' : 'filter'}
        width={20}
        height={20}
      />
      <span>
        {type === 'FILTER' ? '필터' : type === 'SORT' ? '정렬' : '분류'}
      </span>
    </button>
  );
};

export default UserFilteringAtom;
