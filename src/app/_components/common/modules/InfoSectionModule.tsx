import Image from 'next/image';
import InfoContentAtom from '@/_components/common/atoms/InfoContentAtom';

interface SubTitleProps {
  subtitles: string[];
  contents: string[];
}
const InfoSectionModule = ({ subtitles, contents }: SubTitleProps) => {
  return (
    <div className="flex flex-col gap-5">
      {subtitles.map((subtitle, index) => (
        // eslint-disable-next-line react/jsx-key
        <InfoContentAtom subtitle={subtitle} content={contents[index]} />
      ))}
    </div>
  );
};

export default InfoSectionModule;
