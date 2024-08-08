import { ReactNode } from 'react';

interface UserFilteringSubContainerProps {
  children: ReactNode;
}

const UserFilteringSubContainer = ({
  children,
}: UserFilteringSubContainerProps) => {
  return (
    <div className="flex w-full flex-col gap-y-6 border-t-[0.5px] border-sub-100 px-8 pb-9 pt-7">
      {children}
    </div>
  );
};

export default UserFilteringSubContainer;
