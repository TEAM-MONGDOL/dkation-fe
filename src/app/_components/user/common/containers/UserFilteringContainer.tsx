import { RefreshIcon } from '@/_assets/icons';
import Image from 'next/image';
import { ReactNode } from 'react';
import { UserOrderContainerProps } from './UserOrderContainer';
import UserFilteringAtom from '../atoms/UserFilteringAtom';

interface UserFilteringContainerProps {
  type: 'FILTER' | 'NOTICE';
  filterChildren: ReactNode;
  onRefresh: () => void;
}

const UserFilteringContainer = ({
  type,
  filterChildren,
  onRefresh,
}: UserFilteringContainerProps) => {
  return (
    <div className="flex w-[350px] flex-col rounded-xl border border-sub-100/50 bg-white shadow-[2px_2px_2px_2px_rgba(0,0,0,0.02)]">
      <div className="flex w-full items-center justify-between px-8 py-7">
        <span className="text-1 font-semibold">
          {type === 'FILTER' ? '필터' : '분류'}
        </span>
        {type !== 'NOTICE' && (
          <Image
            src={RefreshIcon}
            alt="refresh"
            onClick={(e) => {
              e.stopPropagation();
              onRefresh();
            }}
            className="cursor-pointer"
          />
        )}
      </div>
      <div className="flex w-full flex-col">{filterChildren}</div>
      <div className="mt-[100px] flex w-full items-center justify-end gap-x-2.5 px-8 py-7">
        {/* 머지 후 버튼 컴포넌트로 대체 필요 */}
        <button>취소</button>
        <button>확인</button>
      </div>
    </div>
  );
};

export default UserFilteringContainer;
