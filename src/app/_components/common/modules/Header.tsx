import Image from 'next/image';
import LogoutButton from '@/_components/common/atoms/LogoutButton';
import logo from '@/_assets/images/logo_imsy.png';

const Header = () => {
  return (
    <div className="px-5 items-center py-3.5 flex justify-between border-2 border-cus-100">
      <Image className="h-5 w-24" src={logo} alt="logo" />
      <LogoutButton />
    </div>
  );
};

export default Header;
