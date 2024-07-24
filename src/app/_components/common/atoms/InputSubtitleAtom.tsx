interface SubtitleProps {
  subtitle: string;
  status?: string;
  message?: string;
}
const InputSubtitleAtom = ({ subtitle, status, message }: SubtitleProps) => {
  return (
    <div className="flex justify-between items-center">
      <p className="text-3 font-semibold">{subtitle}</p>
      {(status === 'error' || status === 'correct') && (
        <p
          className={`text-5 ${status === 'error' ? 'text-negative' : 'text-positive'}`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default InputSubtitleAtom;
