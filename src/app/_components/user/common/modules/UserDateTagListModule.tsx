import { datePickerTagList, DatePickerTagType } from '@/_types/commonType';
import UserDateTagAtom from '../atoms/UserDateTagAtom';

interface UserDateTagListModuleProps {
  tags: DatePickerTagType[];
  selectedTag: DatePickerTagType;
  onClickTag: (tag: DatePickerTagType) => void;
}

const UserDateTagListModule = ({
  tags,
  selectedTag,
  onClickTag,
}: UserDateTagListModuleProps) => {
  return (
    <div className="flex w-full flex-wrap gap-2">
      {tags.map((tag, idx) => {
        return (
          <UserDateTagAtom
            text={datePickerTagList[tag]}
            isClicked={selectedTag === tag}
            onClick={() => onClickTag(tag)}
            key={'userDatePickerTag' + tag}
          />
        );
      })}
    </div>
  );
};

export default UserDateTagListModule;
