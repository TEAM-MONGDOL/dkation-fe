import { DatePickerTagType } from '@/_types/commonType';
import UserFilteringTitleAtom from '../atoms/UserFilteringTitleAtom';
import UserDateTagListModule from '../modules/UserDateTagListModule';
import UserFilteringSubContainer from './UserFilteringSubContainer';
import UserDatePickersModule from '../modules/UserDatePickerModule';
import dayjs from 'dayjs';

interface UserDatePickerContainerProps {
  selectedTag: DatePickerTagType;
  onClickTag: (tag: DatePickerTagType) => void;
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
}

const UserDatePickerContainer = ({
  selectedTag,
  onClickTag,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: UserDatePickerContainerProps) => {
  const handleClickTag = (tag: DatePickerTagType) => {
    onClickTag(tag);
    switch (tag) {
      case 'ALL':
        setStartDate(null);
        setEndDate(null);
        break;
      case '1_WEEK':
        setStartDate(dayjs().subtract(1, 'week').toDate());
        setEndDate(new Date());
        break;
      case '1_MONTH':
        setStartDate(dayjs().subtract(1, 'month').toDate());
        setEndDate(new Date());
        break;
      case '3_MONTH':
        setStartDate(dayjs().subtract(3, 'month').toDate());
        setEndDate(new Date());
        break;
      case '6_MONTH':
        setStartDate(dayjs().subtract(6, 'month').toDate());
        setEndDate(new Date());
        break;
      case '1_YEAR':
        setStartDate(dayjs().subtract(1, 'year').toDate());
        setEndDate(new Date());
        break;
      default:
        break;
    }
  };

  return (
    <UserFilteringSubContainer>
      <UserFilteringTitleAtom text="워케이션 날짜" />
      <div className="flex w-full flex-col gap-y-7">
        <UserDateTagListModule
          selectedTag={selectedTag}
          onClickTag={(tag: DatePickerTagType) => handleClickTag(tag)}
        />
        <UserDatePickersModule
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </div>
    </UserFilteringSubContainer>
  );
};

export default UserDatePickerContainer;
