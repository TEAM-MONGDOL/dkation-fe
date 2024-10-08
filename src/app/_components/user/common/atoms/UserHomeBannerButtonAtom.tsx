import Link from 'next/link';

export interface HomeBannerProps {
  link: string;
  buttonBgColor: string;
  buttonTextColor: string;
}
const UserHomeBannerButtonAtom = ({
  link,
  buttonBgColor,
  buttonTextColor,
}: HomeBannerProps) => {
  return (
    <Link href={link}>
      <button
        className={`h-7 w-16 items-center justify-center rounded-[17px] ${buttonBgColor} text-5 ${buttonTextColor}`}
      >
        확인하기
      </button>
    </Link>
  );
};

export default UserHomeBannerButtonAtom;
