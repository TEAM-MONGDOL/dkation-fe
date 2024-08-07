import { WalletIcon } from '@/_assets/icons';
import Image from 'next/image';

interface MyPointProps {
  point: number;
}

const MyPoint = ({ point }: MyPointProps) => {
  return (
    <div className="flex w-full justify-between rounded-xl bg-primary px-11 py-4xl">
      <div className="flex items-center gap-x-2">
        <Image src={WalletIcon} alt="wallet" />
        <p className="text-h3"> 현재 보유 포인트</p>
      </div>
      <p className="text-h1 font-semibold">{point} P</p>
    </div>
  );
};

export default MyPoint;
