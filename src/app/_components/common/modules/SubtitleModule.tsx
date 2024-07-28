import SubtitleIconAtom from '@/_components/common/atoms/SubtitleIconAtom';
import SubtitleTextAtom from '@/_components/common/atoms/SubtitleTextAtom';

interface IconTextModuleProps {
  iconSrc: string;
  iconAlt: string;
  text: string;
}

const IconTextModule = ({ iconSrc, iconAlt, text }: IconTextModuleProps) => {
  return (
    <div className="flex gap-x-2">
      <SubtitleIconAtom src={iconSrc} alt={iconAlt} />
      <SubtitleTextAtom text={text} />
    </div>
  );
};

export default IconTextModule;
