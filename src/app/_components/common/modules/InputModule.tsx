import InputSubtitleAtom from '@/_components/common/atoms/InputSubtitleAtom';
import InputAreaAtom from '@/_components/common/atoms/InputAreaAtom';

interface InputProps {
  placeholder?: string;
  status?: 'error' | 'correct' | 'readonly' | 'disabled';
  value?: string;
  subtitle?: string;
  message?: string;
  textCount?: number;
}

const InputModule = ({
  placeholder,
  status,
  value,
  subtitle,
  message,
  textCount,
}: InputProps) => {
  return (
    <div className="flex flex-col">
      <InputSubtitleAtom
        message={message}
        status={status}
        subtitle={subtitle}
      />
      <InputAreaAtom
        placeholder={placeholder}
        status={status}
        value={value}
        textCount={textCount}
      />
    </div>
  );
};

export default InputModule;
