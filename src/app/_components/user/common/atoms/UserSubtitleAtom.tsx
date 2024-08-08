export interface SubtitleProps {
  subtitle: string;
}
const UserSubtitleAtom = ({ subtitle }: SubtitleProps) => {
  return <h2 className="mb-6 pt-12 text-h2 font-semibold">{subtitle}</h2>;
};

export default UserSubtitleAtom;
