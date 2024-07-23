import { useEffect, useState } from 'react';
import { datePickerTagList, DatePickerTagType } from '@/_types/commonType';
import AccordionHeaderModule from '@/_components/common/modules/AccordionHeaderModule';
import AccordionBodyModule from '@/_components/common/modules/AccordionBodyModule';
import DatePickersModule from '@/_components/common/modules/DatePickersModule';
import DatePickerTagListModule from '@/_components/common/modules/DatePickerTagListModule';

interface DatePickerContainerProps {
  title?: string;
  selectedTag: DatePickerTagType | null;
  setSelectedTag: (selected: DatePickerTagType | null) => void;
  startDate: Date | null;
  setStartDate: (start: Date | null) => void;
  endDate: Date | null;
  setEndDate: (end: Date | null) => void;
}

const DatePickerContainer = ({
  title = '날짜',
  selectedTag,
  setSelectedTag,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: DatePickerContainerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (selectedTag) {
      const today = new Date();
      let newStartDate: Date | null = today;
      let newEndDate: Date | null = new Date();

      switch (selectedTag) {
        case 'ALL':
          newStartDate = null;
          newEndDate = null;
          break;
        case '1_WEEK':
          newStartDate.setDate(today.getDate() - 7);
          break;
        case '1_MONTH':
          newStartDate.setMonth(today.getMonth() - 1);
          break;
        case '3_MONTH':
          newStartDate.setMonth(today.getMonth() - 3);
          break;
        case '6_MONTH':
          newStartDate.setMonth(today.getMonth() - 6);
          break;
        case '1_YEAR':
          newStartDate.setFullYear(today.getFullYear() - 1);
          break;
        default:
          break;
      }

      setStartDate(newStartDate);
      setEndDate(newEndDate);
    }
  }, [selectedTag, setStartDate, setEndDate]);

  return (
    <div className="flex w-full flex-col px-3 py-2.5">
      <AccordionHeaderModule
        title={title}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
      <AccordionBodyModule isExpanded={isExpanded}>
        <div className="flex w-full flex-col gap-y-4">
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
        </div>
      </AccordionBodyModule>
    </div>
  );
};

export default DatePickerContainer;
