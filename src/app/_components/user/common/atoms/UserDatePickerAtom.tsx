import { CalendarIcon, NavigateBefore, NavigateNext } from '@/_assets/icons';
import Image from 'next/image';
import DatePicker from 'react-datepicker';

interface UserDatePickerAtomProps {
  selectedDate: Date | null;
  setSelectedDate: (prev: Date | null) => void;
  minDate?: Date | null;
  placeholderText?: string;
}

const UserDatePickerAtom = ({
  selectedDate,
  setSelectedDate,
  minDate,
  placeholderText,
}: UserDatePickerAtomProps) => {
  return (
    <DatePicker
      className="flex w-full items-center justify-center rounded-md border border-sub-100 bg-sub-100/10 px-4 py-2 text-center text-4 text-sub-200 placeholder:text-sub-200 focus:outline-primary"
      placeholderText={placeholderText}
      selected={selectedDate}
      onChange={setSelectedDate}
      dateFormat="yyyy.MM.dd"
      minDate={minDate === null ? undefined : minDate}
      maxDate={new Date()}
      showIcon
      icon={<Image src={CalendarIcon} alt="calendar" width={24} height={24} />}
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

export default UserDatePickerAtom;
