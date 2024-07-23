import { useState } from 'react';
import { datePickerTagList, DatePickerTagType } from '@/_types/commonType';
import AccordionHeaderModule from '@/_components/common/modules/AccordionHeaderModule';
import AccordionBodyModule from '@/_components/common/modules/AccordionBodyModule';
import DatePickersModule from '@/_components/common/modules/DatePickersModule';
import DatePickerTagListModule from '@/_components/common/modules/DatePickerTagListModule';

interface DatePickerContainerProps {
  selectedTag: DatePickerTagType | null;
  setSelectedTag: (selected: DatePickerTagType | null) => void;
  startDate: Date | null;
  setStartDate: (start: Date | null) => void;
  endDate: Date | null;
  setEndDate: (end: Date | null) => void;
}

const DatePickerContainer = ({
  selectedTag,
  setSelectedTag,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: DatePickerContainerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="flex w-full flex-col px-3 py-2.5">
      <AccordionHeaderModule
        title="날짜"
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
      <AccordionBodyModule isExpanded={isExpanded}>
        <DatePickerTagListModule
          tags={
            Object.entries(datePickerTagList) as [DatePickerTagType, string][]
          }
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
        <DatePickersModule
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </AccordionBodyModule>
    </div>
  );
};

export default DatePickerContainer;
