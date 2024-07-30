import { EllipseIcon } from '@/_assets/icons';
import { EmptyContainer } from '@/_constants/common';
import Image from 'next/image';

const EmptyContentModule = () => {
  return (
    <div className="flex flex-col items-center">
      <Image src={EllipseIcon} alt="xcircleicon" />
      <p className="mt-3 text-3 font-bold text-sub-200">
        {EmptyContainer.CONTENT}
      </p>
    </div>
  );
};

export default EmptyContentModule;
