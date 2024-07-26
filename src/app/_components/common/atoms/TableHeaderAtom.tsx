interface TableHeaderAtomProps {
  title: string;
  width?: string;
}

const TableHeaderAtom = ({ title, width }: TableHeaderAtomProps) => {
  return (
    <th style={{ width }} className="text-4 font-normal text-sub-300">
      {title}
    </th>
  );
};

export default TableHeaderAtom;
