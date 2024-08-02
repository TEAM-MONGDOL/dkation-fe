interface SubtitleTextAtomProps {
  text: string;
}

const SubtitleTextAtom = ({ text }: SubtitleTextAtomProps) => {
  return <p className="text-[25px] font-bold">{text}</p>;
};

export default SubtitleTextAtom;
