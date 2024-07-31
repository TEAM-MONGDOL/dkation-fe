import React from 'react';
import InfoSectionContainer from '@/_components/common/containers/InfoSectionContainer';
import { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';

interface PlaceListButtonProps {
  image: StaticImageData;
  data: { subtitle: string; content: string }[];
  domain: string;
}

const PlaceListButton: React.FC<PlaceListButtonProps> = ({
  image,
  data,
  domain,
}) => {
  const router = useRouter();
  const buttonClick = () => {
    router.push(domain);
  };
  return (
    <button onClick={buttonClick}>
      <InfoSectionContainer row image={image} data={data} />
    </button>
  );
};

export default PlaceListButton;
