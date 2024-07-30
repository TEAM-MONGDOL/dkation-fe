import EmptyContentModule from '@/_components/common/modules/EmptyContentModule';

interface EmptyContainerProps {
  colSpan?: number;
}

const EmptyContainer = ({ colSpan }: EmptyContainerProps) => {
  return (
    <td colSpan={colSpan}>
      <div className="h-40 w-full content-center bg-cus-100">
        <EmptyContentModule />
      </div>
    </td>
  );
};

export default EmptyContainer;
