export interface HomeBannerProps {
  title: string;
  textColor: string;
}
const UserHomeBannerTitleAtom = ({ title, textColor }: HomeBannerProps) => {
  return <p className={`text-center text-1 ${textColor}`}>{title}</p>;
};

export default UserHomeBannerTitleAtom;
