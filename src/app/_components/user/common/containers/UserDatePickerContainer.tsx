import { DatePickerTagType } from '@/_types/commonType';
import UserFilteringTitleAtom from '../atoms/UserFilteringTitleAtom';
import UserDateTagListModule from '../modules/UserDateTagListModule';
import UserFilteringSubContainer from './UserFilteringSubContainer';
import UserDatePickersModule from '../modules/UserDatePickerModule';

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
  return (
    <UserFilteringSubContainer>
      <UserFilteringTitleAtom text="워케이션 날짜" />
      <div className="flex w-full flex-col gap-y-7">
        <UserDateTagListModule
          selectedTag={selectedTag}
          onClickTag={onClickTag}
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
