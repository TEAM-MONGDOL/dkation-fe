import { InfoIcon } from '@/_assets/icons';
import Image from 'next/image';
import React from 'react';

const PointPolicyInfoModule = () => {
  return (
    <div className="flex w-full items-start gap-x-12 rounded-regular bg-cus-100 p-5">
      <div className="flex items-center gap-x-3">
        <Image src={InfoIcon} alt="Info Icon" width={24} height={24} />
        <span className="font-semibold text-sub-300">주의사항</span>
      </div>
      <ul className="list-inside list-disc text-sub-200">
        <li>
          포인트 정책 등록 시 이는 등록 일자 이후의 모든 포인트 심사 및 등록에
          적용됩니다.
        </li>
        <li>
          회원은 이러한 정책에 알맞은 포인트 신청을 진행할 수 있습니다. 잦은
          수정은 지양해주시길 바랍니다.
        </li>
        <li>{`단발성 이벤트로 인한 포인트 지급은 정책 등록이 아닌 공지 > 이벤트 등록과 단체 포인트 지급하기 기능을 이용해주세요.`}</li>
      </ul>
    </div>
  );
};

export default PointPolicyInfoModule;
