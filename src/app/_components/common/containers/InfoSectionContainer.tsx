import Image, { StaticImageData } from 'next/image';
import InfoSectionModule from '@/_components/common/modules/InfoSectionModule';

interface InfoSectionContainerProps {
  title?: string;
  image?: StaticImageData;
  data: { subtitle: string; content: string }[];
  row?: boolean;
}
const InfoSectionContainer = ({
  data,
  image,
  title,
  row,
}: InfoSectionContainerProps) => {
  return (
    <div className="w-full rounded-regular border border-stroke-100 bg-cus-100 px-4 py-5">
      {title && <p className="mb-7 text-1 font-bold">{title}</p>}
      <div className={`flex ${row ? 'items-center gap-10' : 'flex-col gap-7'}`}>
        {image && (
          <Image
            src={image}
            alt="Image"
            className={`${row ? 'w-[300px]' : 'w-full'}`}
          />
        )}
        <InfoSectionModule data={data} />
      </div>
    </div>
  );
};

export default InfoSectionContainer;
