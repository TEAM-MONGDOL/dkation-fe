import DatePickerAtom from '@/_components/common/atoms/DatePickerAtom';
import dayjs from 'dayjs';

interface DatePickersModuleProps {
  startDate: Date | null;
  setStartDate: (prev: Date | null) => void;
  endDate: Date | null;
  setEndDate: (prev: Date | null) => void;
  className?: string;
  startDatePlaceholder?: string;
  endDatePlaceholder?: string;
}

const DatePickersModule = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  className,
  startDatePlaceholder,
  endDatePlaceholder,
}: DatePickersModuleProps) => {
  return (
    <div
      className={`${className ? `${className}` : 'flex w-full items-center gap-x-1'}`}
    >
      <DatePickerAtom
        className={className}
        selectedDate={startDate}
        setSelectedDate={setStartDate}
        placeholderText={startDatePlaceholder}
      />
      <span className="font-medium text-sub-100">-</span>
      <DatePickerAtom
        className={className}
        selectedDate={endDate}
        setSelectedDate={setEndDate}
        minDate={startDate}
        placeholderText={endDatePlaceholder}
      />
    </div>
  );
};

export default DatePickersModule;
