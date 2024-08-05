export interface HomeBannerProps {
  title: string;
}
const HomeBannerTitleAtom = ({ title }: HomeBannerProps) => {
  return <p className="text-1">{title} 추첨 결과를 확인하세요!</p>;
};

export default HomeBannerTitleAtom;
