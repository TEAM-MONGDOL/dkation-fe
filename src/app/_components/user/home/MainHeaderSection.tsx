'use client';

import Image from 'next/image';
import { LogoTextIcon } from '@/_assets/icons';
import { useRouter } from 'next/navigation';
import UserButtonAtom from '../common/atoms/UserButtonAtom';

const MainHeaderSection = () => {
  const router = useRouter();
  return (
    <section className="flex h-[633px] w-full flex-col bg-primary px-40">
      <div className="bg-home-bg flex h-full flex-col items-start justify-between bg-center bg-no-repeat object-cover pb-28 pt-36 text-sub-400">
        <div className="flex flex-col gap-y-4">
          <Image src={LogoTextIcon} alt="home-logo" width={184} />
          <p className="text-h1 font-semibold">
            일과 휴식을 동시에, 조화로움을 찾아서!
          </p>
        </div>
        <p className="text-1 leading-relaxed">
          디케이션은 디케이테크인의 사내 워케이션 시스템으로,
          <br /> 공정한 추첨을 통해 특별한 경험을 제공합니다.
        </p>
        <UserButtonAtom
          text="워케이션 신청 바로가기"
          onClick={() => {
            router.push('/workation');
          }}
          rightArrow
          size="lg"
          className="rounded-lg"
          buttonStyle="black"
          type="button"
        />
      </div>
    </section>
  );
};

export default MainHeaderSection;
