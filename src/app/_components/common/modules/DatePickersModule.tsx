import DatePickerAtom from '@/_components/common/atoms/DatePickerAtom';
import dayjs from 'dayjs';

interface DatePickersModuleProps {
  startDate: Date;
  setStartDate: (prev: Date) => void;
  endDate: Date;
  setEndDate: (prev: Date) => void;
  className?: string;
}

const DatePickersModule = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  className,
}: DatePickersModuleProps) => {
  return (
    <div
      className={`${className ? `${className}` : 'w-full flex items-center gap-x-1'}`}
    >
      <DatePickerAtom
        className={className}
        selectedDate={startDate}
        setSelectedDate={setStartDate}
        minDate={dayjs().add(-1, 'year').toDate()}
      />
      <span className="font-medium text-sub-100">-</span>
      <DatePickerAtom
        className={className}
        selectedDate={endDate}
        setSelectedDate={setEndDate}
        minDate={startDate}
      />
    </div>
  );
};

export default DatePickersModule;
