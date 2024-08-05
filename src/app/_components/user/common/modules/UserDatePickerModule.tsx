import dayjs from 'dayjs';
import UserDatePickerAtom from '../atoms/UserDatePickerAtom';

interface UserDatePickersModuleProps {
  startDate: Date | null;
  setStartDate: (prev: Date | null) => void;
  endDate: Date | null;
  setEndDate: (prev: Date | null) => void;
  startDatePlaceholder?: string;
  endDatePlaceholder?: string;
}

const UserDatePickersModule = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  startDatePlaceholder,
  endDatePlaceholder,
}: UserDatePickersModuleProps) => {
  return (
    <div className="user-datepicker flex w-full items-center gap-x-2.5">
      <UserDatePickerAtom
        selectedDate={startDate}
        setSelectedDate={setStartDate}
        placeholderText={startDatePlaceholder}
      />
      <UserDatePickerAtom
        selectedDate={endDate}
        setSelectedDate={setEndDate}
        minDate={startDate}
        placeholderText={endDatePlaceholder}
      />
    </div>
  );
};

export default UserDatePickersModule;
