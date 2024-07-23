import Image, { StaticImageData } from 'next/image';
import InfoSectionModule from '@/_components/common/modules/InfoSectionModule';

interface SubTitleProps {
  title?: string;
  image?: StaticImageData;
  subtitles: string[];
  contents: string[];
  row?: boolean;
}
const InfoSectionContainer = ({
  subtitles,
  contents,
  image,
  title,
  row,
}: SubTitleProps) => {
  return (
    <div className="rounded-regular py-5 px-4 w-full bg-cus-100 border border-stroke-100">
      {title && <p className="text-1 font-bold mb-7">{title}</p>}
      <div className={`flex ${row ? 'gap-10 items-center' : 'flex-col gap-7'}`}>
        {image && (
          <Image
            src={image}
            alt="Image"
            className={`${row ? 'w-[300px]' : 'w-full'}`}
          />
        )}
        <InfoSectionModule subtitles={subtitles} contents={contents} />
      </div>
    </div>
  );
};

export default InfoSectionContainer;
