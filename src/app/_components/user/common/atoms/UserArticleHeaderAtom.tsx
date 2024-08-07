import { ReactNode } from 'react';

interface UserArticleHeaderAtomProps {
  children: ReactNode;
}

const UserArticleHeaderAtom = ({ children }: UserArticleHeaderAtomProps) => {
  return (
    <div className="h-6xl w-full border-y-2 border-b-sub-100 border-t-sub-400 bg-sub-100/10">
      {children}
    </div>
  );
};

export default UserArticleHeaderAtom;
