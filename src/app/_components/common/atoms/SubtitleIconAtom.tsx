import Image from 'next/image';

interface SubtitleIconAtomProps {
  src: string;
  alt: string;
}

const SubtitleIconAtom = ({ src, alt }: SubtitleIconAtomProps) => {
  return <Image src={src} alt={alt} />;
};

export default SubtitleIconAtom;
