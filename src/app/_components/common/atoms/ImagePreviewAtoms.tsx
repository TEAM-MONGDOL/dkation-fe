import Image from 'next/image';

interface ImagePreviewProps {
  src: string;
}

const ImagePreviewAtom = ({ src }: ImagePreviewProps) => {
  return (
    <div className="overflow-hidden">
      <Image
        src={src}
        alt="preview"
        width={80}
        height={48}
        className="w-20 h-12 rounded-lg object-cover"
      />
    </div>
  );
};

export default ImagePreviewAtom;
