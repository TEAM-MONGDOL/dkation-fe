'use client';

import { useCallback, useEffect, useState } from 'react';
import { datePickerTagList, DatePickerTagType } from '@/_types/commonType';
import AccordionHeaderModule from '@/_components/common/modules/AccordionHeaderModule';
import AccordionBodyModule from '@/_components/common/modules/AccordionBodyModule';
import DatePickersModule from '@/_components/common/modules/DatePickersModule';
import DatePickerTagListModule from '@/_components/common/modules/DatePickerTagListModule';
import dayjs from 'dayjs';
import { set } from 'zod';

interface DatePickerContainerProps {
  title: string;
  selectedTag: DatePickerTagType;
  setSelectedTag: (selected: DatePickerTagType) => void;
  startDate: Date | null;
  setStartDate: (start: Date | null) => void;
  endDate: Date | null;
  setEndDate: (end: Date | null) => void;
  startDatePlaceholder?: string;
  endDatePlaceholder?: string;
}

const DatePickerContainer = ({
  title,
  selectedTag,
  setSelectedTag,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  startDatePlaceholder,
  endDatePlaceholder,
}: DatePickerContainerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTagClick = useCallback(
    (tag: DatePickerTagType) => {
      setSelectedTag(tag);
      if (tag === 'ALL') {
        setStartDate(null);
        setEndDate(null);
      } else if (tag === '1_WEEK') {
        setStartDate(dayjs().subtract(1, 'week').toDate());
        setEndDate(new Date());
      } else if (tag === '1_MONTH') {
        setStartDate(dayjs().subtract(1, 'month').toDate());
        setEndDate(new Date());
      } else if (tag === '3_MONTH') {
        setStartDate(dayjs().subtract(3, 'month').toDate());
        setEndDate(new Date());
      } else if (tag === '6_MONTH') {
        setStartDate(dayjs().subtract(6, 'month').toDate());
        setEndDate(new Date());
      } else if (tag === '1_YEAR') {
        setStartDate(dayjs().subtract(1, 'year').toDate());
        setEndDate(new Date());
      }
    },
    [setSelectedTag],
  );

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
            setSelectedTag={handleTagClick}
          />
          <DatePickersModule
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            startDatePlaceholder={startDatePlaceholder}
            endDatePlaceholder={endDatePlaceholder}
          />
        </div>
      </AccordionBodyModule>
    </div>
  );
};

export default DatePickerContainer;
