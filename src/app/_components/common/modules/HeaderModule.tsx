import Image from 'next/image';
import LogoutButtonAtom from '@/_components/common/atoms/LogoutButtonAtom';
import logo from '@/_assets/images/logo_imsy.png';

const HeaderModule = () => {
  return (
    <div className="flex h-6xl items-center justify-between border-b border-stroke-100 px-5 py-3.5">
      <Image className="h-full max-w-24 object-contain" src={logo} alt="logo" />
      <LogoutButtonAtom />
    </div>
  );
};

export default HeaderModule;
