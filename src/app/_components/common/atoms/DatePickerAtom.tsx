'use client';

import { NavigateBefore, NavigateNext } from '@/_assets/icons';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useEffect } from 'react';
import DatePicker from 'react-datepicker';

interface DatePickerAtomProps {
  selectedDate: Date | null;
  setSelectedDate: (prev: Date | null) => void;
  minDate?: Date | null;
  className?: string;
  placeholderText?: string;
}

const DatePickerAtom = ({
  selectedDate,
  setSelectedDate,
  minDate,
  className,
  placeholderText,
}: DatePickerAtomProps) => {
  useEffect(() => {
    if (minDate && selectedDate && dayjs(selectedDate).isBefore(minDate)) {
      setSelectedDate(minDate);
    }
  }, [minDate]);

  return (
    <DatePicker
      className={`flex w-full items-center justify-center rounded-lg border border-sub-100 bg-white px-4 text-center text-4 text-sub-400 placeholder:text-sub-200 focus:outline-primary ${className ? `${className}` : 'py-1'}`}
      placeholderText={placeholderText}
      selected={selectedDate}
      onChange={setSelectedDate}
      dateFormat="yyyy.MM.dd"
      minDate={minDate === null ? undefined : minDate}
      maxDate={new Date()}
      formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
      shouldCloseOnSelect
      popperPlacement="bottom-end"
      renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
        <div className="flex items-center justify-between px-3">
          <div className="font-bold text-white">
            {date.getFullYear()}년 {date.getMonth() + 1}월
          </div>
          <div className="flex items-center gap-1">
            <button type="button" onClick={decreaseMonth}>
              <Image
                src={NavigateBefore}
                alt="navigate-before"
                width={24}
                height={24}
              />
            </button>
            <button type="button" onClick={increaseMonth}>
              <Image
                src={NavigateNext}
                alt="navigate-next"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      )}
    />
  );
};

export default DatePickerAtom;
