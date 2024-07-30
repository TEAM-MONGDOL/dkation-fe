import EmptyContentModule from '@/_components/common/modules/EmptyContentModule';

interface HeightProps {
  heightFull?: boolean;
  colSpan?: number;
  text?: string;
}
const EmptyContainer = ({ heightFull = false, colSpan, text }: HeightProps) => {
  return (
    <td colSpan={colSpan}>
      <div
        className={`w-full ${heightFull ? 'h-full' : 'h-40'} content-center bg-cus-100`}
      >
        <EmptyContentModule text={text} />
      </div>
    </td>
  );
};

export default EmptyContainer;
