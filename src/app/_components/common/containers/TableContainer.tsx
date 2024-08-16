import React, { ReactElement, ReactNode, RefObject } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

interface TableContainerProps {
  children: ReactNode;
  maxHeight?: string;
  minWidth?: string;
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
  minWidth,
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
        <table
          className="table-fixed border-separate border-spacing-y-2.5 overflow-auto"
          style={{ minWidth: minWidth || 'auto' }}
        >
          {children}
        </table>
      )}
    </div>
  );
};

export default TableContainer;
