import { DatePickerTagType } from '@/_types/commonType';
import UserFilteringTitleAtom from '../atoms/UserFilteringTitleAtom';
import UserDateTagListModule from '../modules/UserDateTagListModule';
import UserFilteringSubContainer from './UserFilteringSubContainer';

interface UserDatePickerContainerProps {
  selectedTag: DatePickerTagType;
  onClickTag: (tag: DatePickerTagType) => void;
}

const UserDatePickerContainer = ({
  selectedTag,
  onClickTag,
}: UserDatePickerContainerProps) => {
  return (
    <UserFilteringSubContainer>
      <UserFilteringTitleAtom text="워케이션 날짜" />
      <div className="flex w-full flex-col gap-y-7">
        <UserDateTagListModule
          selectedTag={selectedTag}
          onClickTag={onClickTag}
        />
      </div>
    </UserFilteringSubContainer>
  );
};

export default UserDatePickerContainer;
