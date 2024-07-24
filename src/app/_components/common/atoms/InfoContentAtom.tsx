interface InfoContentAtomProps {
  subtitle: string;
  content: string;
}

const InfoContentAtom = ({ subtitle, content }: InfoContentAtomProps) => {
  return (
    <div className="flex gap-1">
      <p className="w-24 text-cus-300 text-4 font-bold">{subtitle}</p>
      <p className="text-sub-300 text-4">
        {content.length >= 40 ? `${content.slice(0, 50)}…` : content}
      </p>
    </div>
  );
};

export default InfoContentAtom;
