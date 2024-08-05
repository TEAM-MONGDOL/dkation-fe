import Link from 'next/link';

export interface WkBannerProps {
  percent: number;
  item: string;
  point: number;
  link: string;
}
const WkBannerInfoModule = ({ percent, item, point, link }: WkBannerProps) => {
  return (
    <Link href={link}>
      <div className="bg-button flex h-[78px] items-center justify-center text-2 text-white">
        당신은 지금 상위 {percent}%! {item}에 참여하면 {point}포인트를 드립니다!
      </div>
    </Link>
  );
};

export default WkBannerInfoModule;
