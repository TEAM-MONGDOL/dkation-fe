'use client';

import { useState } from 'react';
import AccordionHeaderModule from '@/_components/common/modules/AccordionHeaderModule';
import AccordionBodyModule from '@/_components/common/modules/AccordionBodyModule';
import RangeAtom from '@/_components/common/atoms/RangeAtom';

interface RangeContainerProps {
  title: string;
  min: number;
  max: number;
  onChange: ({ min, max }: { min: number; max: number }) => void;
  suffix?: string;
}

const RangeContainer = ({
  title,
  min,
  max,
  onChange,
  suffix,
}: RangeContainerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="flex w-full flex-col px-3 py-2.5">
      <AccordionHeaderModule
        title={title}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
      <AccordionBodyModule isExpanded={isExpanded}>
        <RangeAtom min={min} max={max} onChange={onChange} suffix={suffix} />
      </AccordionBodyModule>
    </div>
  );
};

export default RangeContainer;
