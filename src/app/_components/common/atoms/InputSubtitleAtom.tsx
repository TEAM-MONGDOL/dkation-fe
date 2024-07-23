interface SubtitleProps {
  subtitle: string;
  status?: string;
  message?: string;
}
const InputSubtitleAtom = ({ subtitle, status, message }: SubtitleProps) => {
  return (
    <div className="flex justify-between items-center">
      <p className="text-3 font-semibold">{subtitle}</p>
      {status === 'error' && <p className="text-negative text-5">{message}</p>}
      {status === 'correct' && (
        <p className="text-positive text-5">{message}</p>
      )}
    </div>
  );
};

export default InputSubtitleAtom;
