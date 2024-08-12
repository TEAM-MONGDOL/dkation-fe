export interface HomeBannerProps {
  title: string;
  textColor: string;
}
const UserHomeBannerTitleAtom = ({ title, textColor }: HomeBannerProps) => {
  return (
    <p className={`text-1 ${textColor}`}>{title} 추첨 결과를 확인하세요!</p>
  );
};

export default UserHomeBannerTitleAtom;
