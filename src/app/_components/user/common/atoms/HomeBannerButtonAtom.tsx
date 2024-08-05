import Link from 'next/link';

const HomeBannerButtonAtom = () => {
  return (
    <Link href="/notice">
      <button className="h-7 w-16 items-center justify-center rounded-[17px] bg-primary text-5 text-black">
        확인하기
      </button>
    </Link>
  );
};

export default HomeBannerButtonAtom;
