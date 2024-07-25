interface TableHeaderAtomProps {
  title: string;
  width?: string;
  flexGrow?: boolean;
}

const TableHeaderAtom = ({ title, width, flexGrow }: TableHeaderAtomProps) => (
  <div
    style={{ width, flexGrow: flexGrow ? 1 : 0 }}
    className="flex justify-center items-center text-4 font-normal text-sub-300"
  >
    {title}
  </div>
);

export default TableHeaderAtom;
