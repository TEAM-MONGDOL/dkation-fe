import React from 'react';
import { BalanceIcon, ImproveIcon } from '@/_assets/icons';
import WktInfoItem from './WktInfoItem';

const WktInfoSection = () => {
  return (
    <section className="flex w-full flex-col gap-y-32 border-b border-sub-100 px-40 py-40">
      <div className="flex flex-col">
        <h1 className="text-h1 font-semibold text-sub-400">
          워케이션이란 무엇인가요?
        </h1>
        <p className="mt-8 text-1 text-sub-300">
          워케이션(Workation)은 <span>&lsquo;Work&rsquo;</span>와{' '}
          <span>&lsquo;Vacation&rsquo;</span>의 합성어로,{' '}
          <span>휴가와 업무를 동시에 즐길 수 있는</span> 새로운 근무 형태입니다.
          <br />
          아름다운 해변, 산속 리조트, 혹은 도심 속의 특별한 공간에서 업무를 보며
          동시에 여유로운 시간을 보낼 수 있습니다.
        </p>
      </div>
      <div className="flex w-full items-center justify-center gap-x-8">
        <WktInfoItem
          src={BalanceIcon}
          title="일과 삶의 균형"
          description={`스트레스를 줄이고 창의성을 높여주며\n일과 삶의 균형을 찾게 해줍니다.`}
        />
        <WktInfoItem
          src={ImproveIcon}
          title="더 높은 효율성 발휘"
          description={`새로운 환경에서 일을 하면 재충전된 상태에서\n더 높은 효율성을 발휘할 수 있습니다.`}
        />
      </div>
    </section>
  );
};

export default WktInfoSection;
