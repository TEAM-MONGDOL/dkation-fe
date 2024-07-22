import { KeyboardArrowDown } from '@/_assets/icons';
import Image from 'next/image';

interface AccordionHeaderModuleProps {
  title: string;
  isExpanded: boolean;
  setIsExpanded: (prev: boolean) => void;
}

const AccordionHeaderModule = ({
  title,
  isExpanded,
  setIsExpanded,
}: AccordionHeaderModuleProps) => {
  return (
    <div
      role="presentation"
      className="cursor-pointer w-full flex items-center justify-between py-2 px-3 gap-x-2"
      onClick={() => setIsExpanded(!isExpanded)}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
          setIsExpanded(!isExpanded);
        }
      }}
    >
      <div className="font-bold text-3 text-sub-400">{title}</div>
      <Image
        className={`transform transition-transform duration-300 w-5 h-5 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
        src={KeyboardArrowDown}
        alt="Arrow Down"
      />
    </div>
  );
};

export default AccordionHeaderModule;
