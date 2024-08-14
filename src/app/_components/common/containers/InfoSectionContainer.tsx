import Image, { StaticImageData } from 'next/image';
import InfoSectionModule from '@/_components/common/modules/InfoSectionModule';

interface InfoSectionContainerProps {
  title?: string;
  image?: string;
  data: { subtitle: string; content: string }[] | undefined;
  row?: boolean;
}
const InfoSectionContainer = ({
  data,
  image,
  title,
  row,
}: InfoSectionContainerProps) => {
  const widthValue = row ? 330 : '100%'; // width, height 재설정해야함
  return (
    <div className="w-full rounded-regular border border-stroke-100 bg-cus-100 px-4 py-5">
      {title && <p className="mb-7 text-1 font-bold">{title}</p>}
      <div className={`flex ${row ? 'items-center gap-10' : 'flex-col gap-7'}`}>
        {image && (
          <Image
            className="max-h-[210px] min-h-[210px] min-w-[330px] max-w-[330px]"
            width={typeof widthValue === 'number' ? widthValue : undefined}
            height={100}
            src={image}
            alt="Image"
          />
        )}
        <InfoSectionModule data={data} />
      </div>
    </div>
  );
};

export default InfoSectionContainer;
