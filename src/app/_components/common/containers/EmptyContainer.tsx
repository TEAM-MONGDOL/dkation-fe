import EmptyContentModule from '@/_components/common/modules/EmptyContentModule';

interface HeightProps {
  heightFull?: boolean;
}
const EmptyContainer = ({ heightFull = false }: HeightProps) => {
  return (
    <div
      className={`w-full ${heightFull ? 'h-full' : ' h-40'} bg-cus-100 content-center`}
    >
      <EmptyContentModule />
    </div>
  );
};

export default EmptyContainer;
