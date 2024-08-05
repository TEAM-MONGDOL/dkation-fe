import React, { ReactElement, ReactNode, RefObject } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

interface TableContainerProps {
  children: ReactNode;
  maxHeight?: string;
  isInfiniteScroll?: boolean;
  infiniteScrollProps?: {
    load: ReactElement;
    hasMore: boolean;
    loadMore: () => void;
    useWindow?: boolean;
  };
}

const TableContainer = ({
  children,
  maxHeight,
  isInfiniteScroll,
  infiniteScrollProps,
}: TableContainerProps) => {
  return (
    <div className={`flex w-full flex-col ${maxHeight || ''} overflow-y-auto`}>
      {isInfiniteScroll && infiniteScrollProps ? (
        <InfiniteScroll
          loader={infiniteScrollProps.load}
          hasMore={infiniteScrollProps.hasMore}
          loadMore={infiniteScrollProps.loadMore}
          useWindow={infiniteScrollProps.useWindow}
        >
          <table className="min-w-full table-fixed border-separate border-spacing-y-2.5">
            {children}
          </table>
        </InfiniteScroll>
      ) : (
        <table className="min-w-full table-fixed border-separate border-spacing-y-2.5">
          {children}
        </table>
      )}
    </div>
  );
};

export default TableContainer;
