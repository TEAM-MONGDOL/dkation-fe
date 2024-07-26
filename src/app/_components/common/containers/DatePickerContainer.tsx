'use client';

import { useEffect, useState } from 'react';
import { datePickerTagList, DatePickerTagType } from '@/_types/commonType';
import AccordionHeaderModule from '@/_components/common/modules/AccordionHeaderModule';
import AccordionBodyModule from '@/_components/common/modules/AccordionBodyModule';
import DatePickersModule from '@/_components/common/modules/DatePickersModule';
import DatePickerTagListModule from '@/_components/common/modules/DatePickerTagListModule';
import dayjs from 'dayjs';

interface DatePickerContainerProps {
  title: string;
  selectedTag: DatePickerTagType;
  setSelectedTag: (selected: DatePickerTagType) => void;
  startDate: Date;
  setStartDate: (start: Date) => void;
  endDate: Date;
  setEndDate: (end: Date) => void;
}

const DatePickerContainer = ({
  title,
  selectedTag,
  setSelectedTag,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: DatePickerContainerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setEndDate(dayjs().toDate());

    switch (selectedTag) {
      case 'ALL':
        setStartDate(dayjs().add(-1, 'year').toDate());
        break;
      case '1_WEEK':
        setStartDate(dayjs().add(-1, 'week').toDate());
        break;
      case '1_MONTH':
        setStartDate(dayjs().add(-1, 'month').toDate());
        break;
      case '3_MONTH':
        setStartDate(dayjs().add(-3, 'month').toDate());
        break;
      case '6_MONTH':
        setStartDate(dayjs().add(-6, 'month').toDate());
        break;
      case '1_YEAR':
        setStartDate(dayjs().add(-1, 'year').toDate());
        break;
      default:
        break;
    }
  }, [selectedTag]); // setStartDate, setEndDate를 넣으니까 무한루프

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
          <p className="text-5 text-sub-200">* 최대 1년 조회 가능</p>
        </div>
      </AccordionBodyModule>
    </div>
  );
};

export default DatePickerContainer;
