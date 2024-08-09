import Image from 'next/image';

interface WktInfoItemProps {
  src: string;
  title: string;
  description: string;
}

const WktInfoItem = ({ src, title, description }: WktInfoItemProps) => {
  return (
    <div className="bg-cus-400 flex h-80 flex-1 flex-col gap-y-7 whitespace-pre-line rounded-xl p-9 text-sub-400">
      <Image src={src} alt="wkt-info-icon" width={44} height={44} />
      <h3 className="text-h3 font-semibold">{title}</h3>
      <p className="font-medium">{description}</p>
    </div>
  );
};

export default WktInfoItem;
