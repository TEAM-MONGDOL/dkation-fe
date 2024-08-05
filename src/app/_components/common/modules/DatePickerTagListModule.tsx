import DatePickerTagAtom from '@/_components/common/atoms/DatePickerTagAtom';
import { DatePickerTagType } from '@/_types/commonType';

interface DatePickerTagListModuleProps {
  tags: [DatePickerTagType, string][];
  selectedTag: DatePickerTagType;
  setSelectedTag: (prev: DatePickerTagType) => void;
}

const DatePickerTagListModule = ({
  tags,
  selectedTag,
  setSelectedTag,
}: DatePickerTagListModuleProps) => {
  return (
    <div className="flex w-full flex-wrap gap-1.5">
      {tags.map(([tag, text]) => (
        <DatePickerTagAtom
          key={`filter-tag-${tag}`}
          text={text}
          isClicked={selectedTag === tag}
          onClick={() => {
            setSelectedTag(tag);
          }}
        />
      ))}
    </div>
  );
};

export default DatePickerTagListModule;
