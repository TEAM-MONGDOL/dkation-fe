import Link from 'next/link';

export interface HomeBannerProps {
  link: string;
}
const UserHomeBannerButtonAtom = ({ link }: HomeBannerProps) => {
  return (
    <Link href={link}>
      <button className="h-7 w-16 items-center justify-center rounded-[17px] bg-primary text-5 text-black">
        확인하기
      </button>
    </Link>
  );
};

export default UserHomeBannerButtonAtom;
