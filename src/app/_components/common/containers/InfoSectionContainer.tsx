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
        <InfoSectionModule data={data} />
      </div>
    </div>
  );
};

export default InfoSectionContainer;
