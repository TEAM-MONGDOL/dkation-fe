import {
  datePickerTagConverter,
  datePickerTagList,
  DatePickerTagType,
} from '@/_types/commonType';
import UserDateTagAtom from '../atoms/UserDateTagAtom';

interface UserDateTagListModuleProps {
  selectedTag: DatePickerTagType;
  onClickTag: (tag: DatePickerTagType) => void;
}

const UserDateTagListModule = ({
  selectedTag,
  onClickTag,
}: UserDateTagListModuleProps) => {
  return (
    <div className="flex w-full flex-wrap gap-2">
      {datePickerTagList.map((tag, idx) => {
        return (
          <UserDateTagAtom
            text={datePickerTagConverter[tag]}
            isClicked={selectedTag === tag}
            onClick={() => onClickTag(tag)}
            key={`userDatePickerTag-${tag}`}
          />
        );
      })}
    </div>
  );
};

export default UserDateTagListModule;
