import Image from 'next/image';
import InfoContentAtom from '@/_components/common/atoms/InfoContentAtom';

interface SubTitleProps {
  subtitles: string[];
  contents: string[];
  place?: boolean;
}
const InfoSectionModule = ({ subtitles, contents, place }: SubTitleProps) => {
  return (
    <div className="flex flex-col gap-5">
      {subtitles.map((subtitle, index) => (
        // eslint-disable-next-line react/jsx-key
        <InfoContentAtom
          subtitle={subtitle}
          content={contents[index]}
          place={place}
        />
      ))}
    </div>
  );
};

export default InfoSectionModule;
