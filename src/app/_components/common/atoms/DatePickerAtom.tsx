'use client';

import { NavigateBefore, NavigateNext } from '@/_assets/icons';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useEffect } from 'react';
import DatePicker from 'react-datepicker';

const findMinDate = (minDate: Date) => {
  const lastYear = new Date();
  lastYear.setFullYear(lastYear.getFullYear() - 1);
  return dayjs(lastYear).isAfter(minDate) ? lastYear : minDate;
};

interface DatePickerAtomProps {
  selectedDate: Date;
  setSelectedDate: (prev: Date) => void;
  minDate: Date;
}

const DatePickerAtom = ({
  selectedDate,
  setSelectedDate,
  minDate,
}: DatePickerAtomProps) => {
  return (
    <DatePicker
      className="flex w-full text-4 text-center items-center justify-center border border-sub-100 bg-white text-sub-400 px-4 py-1 rounded-lg focus:outline-primary"
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date || selectedDate)}
      dateFormat="yyyy.MM.dd"
      minDate={findMinDate(minDate)}
      maxDate={new Date()}
      formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
      shouldCloseOnSelect
      popperPlacement="bottom-end"
      renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
        <div className="flex justify-between items-center px-3">
          <div className="text-white font-bold">
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
                alt="navigate-before"
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
