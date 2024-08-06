import { RefreshIcon } from '@/_assets/icons';
import Image from 'next/image';
import { ReactNode } from 'react';
import UserOrderContainer, {
  UserOrderContainerProps,
} from './UserOrderContainer';
import UserFilteringAtom from '../atoms/UserFilteringAtom';
import UserFilteringContainer from './UserFilteringContainer';

interface UserFilteringSectionContainerProps {
  filterOption?: {
    onClickFilter: () => void;
    isFilterOpen: boolean;
    filterChildren: ReactNode;
    onRefresh: () => void;
  };
  orderOption?: {
    onClickOrder: () => void;
    isOrderOpen: boolean;
    orderProps: UserOrderContainerProps;
  };
}

const UserFilteringSectionContainer = ({
  filterOption,
  orderOption,
}: UserFilteringSectionContainerProps) => {
  return (
    <div className="relative flex items-center justify-end gap-x-2.5">
      {filterOption && (
        <>
          <UserFilteringAtom
            type="FILTER"
            onClick={filterOption.onClickFilter}
          />
          {filterOption.isFilterOpen && (
            <div className="absolute bottom-[-10px] right-0 translate-y-full">
              <UserFilteringContainer
                filterChildren={filterOption.filterChildren}
                onRefresh={filterOption.onRefresh}
              />
            </div>
          )}
        </>
      )}
      {orderOption && (
        <>
          <UserFilteringAtom type="SORT" onClick={orderOption.onClickOrder} />
          {orderOption.isOrderOpen && (
            <div className="absolute bottom-[-10px] right-0 translate-y-full">
              <UserOrderContainer
                orders={orderOption.orderProps.orders}
                selectedOrder={orderOption.orderProps.selectedOrder}
                setSelectedOrder={orderOption.orderProps.setSelectedOrder}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserFilteringSectionContainer;
