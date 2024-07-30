import EmptyContentModule from '@/_components/common/modules/EmptyContentModule';

interface HeightProps {
  heightFull?: boolean;
  colSpan?: number;
}
const EmptyContainer = ({ heightFull = false, colSpan }: HeightProps) => {
  return (
    <td colSpan={colSpan}>
      <div
        className={`w-full ${heightFull ? 'h-full' : 'h-40'} content-center bg-cus-100`}
      >
        <EmptyContentModule />
      </div>
    </td>
  );
};

export default EmptyContainer;
