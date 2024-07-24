'use client';

import React from 'react';

interface ShowDetailButtonAtomProps {
  onClick: () => void;
}

const ShowDetailButtonAtom = ({ onClick }: ShowDetailButtonAtomProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-cus-100 font-bold text-sub-300 text-2 px-4 py-2 rounded-full"
    >
      상세보기
    </button>
  );
};

export default ShowDetailButtonAtom;
