import { XCircleIcon } from '@/_assets/icons';
import { EmptyContainer } from '@/_constants/common';
import Image from 'next/image';

const EmptyContent = () => {
  return (
    <div className="flex flex-col items-center">
      <Image src={XCircleIcon} alt="xcircleicon" />
      <p className="mt-3 text-sub-200 font-bold text-3">
        {EmptyContainer.CONTENT}
      </p>
    </div>
  );
};

export default EmptyContent;
