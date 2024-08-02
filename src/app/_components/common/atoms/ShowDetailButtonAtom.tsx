'use client';

import React from 'react';

interface ShowDetailButtonAtomProps {
  onClick?: () => void;
}

const ShowDetailButtonAtom = ({ onClick }: ShowDetailButtonAtomProps) => {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-cus-100 px-3.5 py-2 text-4 font-bold text-sub-300"
    >
      상세보기
    </button>
  );
};

export default ShowDetailButtonAtom;
