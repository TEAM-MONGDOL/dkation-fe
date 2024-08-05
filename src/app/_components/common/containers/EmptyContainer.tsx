import EmptyContentModule from '@/_components/common/modules/EmptyContentModule';

interface HeightProps {
  heightFull?: boolean;
  colSpan?: number;
  text?: string;
  notTable?: boolean;
}

const EmptyContainer = ({
  heightFull = false,
  colSpan,
  text,
  notTable,
}: HeightProps) => {
  return notTable ? (
    <div
      className={`w-full ${heightFull ? 'h-full' : 'h-40'} content-center bg-cus-100`}
    >
      <EmptyContentModule text={text} />
    </div>
  ) : (
    <tr>
      <td colSpan={colSpan}>
        <div
          className={`w-full ${heightFull ? 'h-full' : 'h-40'} content-center bg-cus-100`}
        >
          <EmptyContentModule text={text} />
        </div>
      </td>
    </tr>
  );
};

export default EmptyContainer;
