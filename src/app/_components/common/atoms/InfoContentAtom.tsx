interface SubTitleProps {
  subtitle: string;
  content: string;
  place?: boolean;
}

const InfoContentAtom = ({ subtitle, content, place }: SubTitleProps) => {
  return (
    <div className="flex gap-1">
      <p className="w-24 text-cus-300 text-4 font-bold">{subtitle}</p>
      <p className={`text-sub-300 text-4 ${place ? 'underline' : ''}`}>
        {content.length >= 40 ? `${content.slice(0, 50)}…` : content}
      </p>
    </div>
  );
};

export default InfoContentAtom;
