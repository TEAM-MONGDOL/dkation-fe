import EmptyContentModule from '@/_components/common/modules/EmptyContentModule';

interface EmptyContainerProps {
  colSpan?: number;
}

const EmptyContainer = ({ colSpan }: EmptyContainerProps) => {
  return (
    <td colSpan={colSpan}>
      <div className="w-full h-40 bg-cus-100 content-center">
        <EmptyContentModule />
      </div>
    </td>
  );
};

export default EmptyContainer;
