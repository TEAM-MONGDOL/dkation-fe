import InputSubtitleAtom from '@/_components/common/atoms/InputSubtitleAtom';
import InputAreaAtom from '@/_components/common/atoms/InputAreaAtom';

interface InputProps {
  placeholder?: string;
  status?: 'error' | 'correct' | 'readonly' | 'disabled';
  value?: string;
  subtitle: string;
  message?: string;
}
const InputModule = ({
  placeholder,
  status,
  value,
  subtitle,
  message,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-3">
      <InputSubtitleAtom
        message={message}
        status={status}
        subtitle={subtitle}
      />
      <InputAreaAtom placeholder={placeholder} status={status} value={value} />
    </div>
  );
};

export default InputModule;
