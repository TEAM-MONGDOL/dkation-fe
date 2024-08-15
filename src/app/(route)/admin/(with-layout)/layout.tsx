import { DkationAdminLogo } from '@/_assets/icons';
import NavBarContainer from '@/_components/common/containers/NavBarContainer';
import HeaderModule from '@/_components/common/modules/HeaderModule';
import Image from 'next/image';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen flex-col">
      {/* 1280px 미만일 때만 표시 */}
      <div className="flex h-screen flex-col items-center justify-center text-center xl:hidden">
        <Image src={DkationAdminLogo} alt="logo" width={200} height={200} />
        <h1 className="mt-8 break-keep text-1 font-semibold">
          본 관리자 서비스는 PC 기기를 대상으로
          <br className="block md:hidden" /> 제공되고 있습니다.
        </h1>
        <p className="mt-3 break-keep text-2">
          쾌적한 서비스 이용을 위해 PC 기기에서 접속해주세요.
        </p>
      </div>
      <div className="hidden h-screen flex-col xl:flex">
        <HeaderModule />
        <div className="flex grow">
          <NavBarContainer />
          <main className="flex-1 overflow-y-auto px-20 py-6xl">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
