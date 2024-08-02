interface InfoContentAtomProps {
  isStartAlign?: boolean;
  data: { subtitle: string; content: string };
}

const InfoContentAtom = ({
  isStartAlign = false,
  data: { subtitle, content },
}: InfoContentAtomProps) => {
  return (
    <div className="flex gap-1">
      <p
        className={`w-24 flex-shrink-0 ${isStartAlign ? 'text-start' : ''} text-4 font-bold text-cus-300`}
      >
        {subtitle}
      </p>
      <p className="line-clamp-1 text-4 text-sub-300">{content}</p>
    </div>
  );
};

export default InfoContentAtom;
