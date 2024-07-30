import Image from 'next/image';
import LogoutButtonAtom from '@/_components/common/atoms/LogoutButtonAtom';
import logo from '@/_assets/images/logo_imsy.png';

const HeaderModule = () => {
  return (
    <div className="flex items-center justify-between border-2 border-cus-100 px-5 py-3.5">
      <Image className="h-5 w-24" src={logo} alt="logo" />
      <LogoutButtonAtom />
    </div>
  );
};

export default HeaderModule;
