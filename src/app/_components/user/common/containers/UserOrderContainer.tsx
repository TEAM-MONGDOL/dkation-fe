import RadioButtonModule from '@/_components/common/modules/RadioButtonModule';

interface UserOrderContainerProps {
  orders: { key: string; value: string }[];
  selectedOrder: string;
  setSelectedOrder: (order: string) => void;
}

const UserOrderContainer = ({
  orders,
  selectedOrder,
  setSelectedOrder,
}: UserOrderContainerProps) => {
  return (
    <div className="flex w-[250px] flex-col rounded-xl border border-sub-100/50 shadow-[2px_2px_2px_2px_rgba(0,0,0,0.02)]">
      <div className="flex w-full items-center justify-between px-8 py-7">
        <span className="text-1 font-semibold">정렬</span>
      </div>
      <div className="w-full border-t-[0.5px] border-sub-100 px-8 py-3xl">
        {orders.map((order, idx) => (
          <RadioButtonModule
            option={order.value}
            isClicked={selectedOrder === order.key}
            onClick={() => setSelectedOrder(order.key)}
            key={`userOrder-${order.key}`}
          />
        ))}
      </div>
    </div>
  );
};

export default UserOrderContainer;
