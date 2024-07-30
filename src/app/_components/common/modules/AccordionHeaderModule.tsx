import { KeyboardArrowDownIcon } from '@/_assets/icons';
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
      className="flex w-full cursor-pointer items-center justify-between gap-x-2 px-3 py-2"
      onClick={() => setIsExpanded(!isExpanded)}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
          setIsExpanded(!isExpanded);
        }
      }}
    >
      <div className="text-3 font-bold text-sub-400">{title}</div>
      <Image
        className={`h-5 w-5 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
        src={KeyboardArrowDownIcon}
        alt="Arrow Down"
      />
    </div>
  );
};

export default AccordionHeaderModule;
