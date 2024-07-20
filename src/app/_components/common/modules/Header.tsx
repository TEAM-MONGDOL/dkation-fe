import Image from 'next/image';
import LogoutButton from '@/_components/common/atoms/LogoutButton';
import logo from '@/_assets/images/logo_imsy.png';

const Header = () => {
  return (
    <div className="px-[20px] items-center py-[11px] flex justify-between border-2 border-cus-100">
      <Image className="h-[20px] w-[91px]" src={logo} alt="logo" />
      <LogoutButton />
    </div>
  );
};

export default Header;
