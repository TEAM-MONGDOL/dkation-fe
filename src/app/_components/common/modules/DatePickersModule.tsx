import DatePickerAtom from '@/_components/common/atoms/DatePickerAtom';

interface DatePickersModuleProps {
  startDate: Date | null;
  setStartDate: (prev: Date | null) => void;
  endDate: Date | null;
  setEndDate: (prev: Date | null) => void;
}

const DatePickersModule = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: DatePickersModuleProps) => {
  return (
    <div className="w-full flex items-center gap-x-1">
      <DatePickerAtom selectedDate={startDate} setSelectedDate={setStartDate} />
      <span className="font-medium text-sub-100">-</span>
      <DatePickerAtom
        selectedDate={endDate}
        setSelectedDate={setEndDate}
        minDate={startDate}
      />
    </div>
  );
};

export default DatePickersModule;
