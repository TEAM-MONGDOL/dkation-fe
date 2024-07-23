import DatePickerTagAtom from '@/_components/common/atoms/DatePickerTagAtom';
import { DatePickerTagType } from '@/_types/commonType';

interface DatePickerTagListModuleProps {
  tags: [DatePickerTagType, string][];
  selectedTag: DatePickerTagType | null;
  setSelectedTag: (prev: DatePickerTagType | null) => void;
}

const DatePickerTagListModule = ({
  tags,
  selectedTag,
  setSelectedTag,
}: DatePickerTagListModuleProps) => {
  return (
    <div className="w-full flex flex-wrap gap-1.5">
      {tags.map(([tag, text]) => (
        <DatePickerTagAtom
          key={`filter-tag-${tag}`}
          text={text}
          isClicked={selectedTag === tag}
          onClick={() => {
            if (selectedTag === tag) {
              setSelectedTag(null);
            } else {
              setSelectedTag(tag);
            }
          }}
        />
      ))}
    </div>
  );
};

export default DatePickerTagListModule;
