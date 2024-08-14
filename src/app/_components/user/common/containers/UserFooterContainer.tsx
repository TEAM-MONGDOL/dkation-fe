import { DkationLogo, DktechinLogo } from '@/_assets/icons';
import { ServiceInfo } from '@/_constants/common';
import Image from 'next/image';

const UserFooterContainer = () => {
  return (
    <div className="flex w-full min-w-[780px] flex-col gap-y-10 border-t border-sub-100 px-28 pb-11 pt-16">
      <div className="flex w-full items-end justify-between gap-x-5">
        <div className="flex flex-col gap-y-16">
          <Image src={DkationLogo} alt="company_logo" />
          <div className="flex flex-col gap-y-1.5 text-4 text-footer">
            <span>고객지원</span>
            <p className="flex flex-wrap items-center gap-x-5">
              <span>Tel : {ServiceInfo.tel}</span>
              <span>E-mail : {ServiceInfo.email}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-y-8 text-4 text-footer">
          <Image src={DktechinLogo} alt="company_logo" />
          <div className="flex flex-col items-end gap-y-2">
            <p className="flex flex-wrap items-center justify-end gap-x-5 text-end">
              <span>{ServiceInfo.companyName}</span>
              <span>대표이사 : {ServiceInfo.ceo}</span>
              <span>주소 : {ServiceInfo.companyAddress}</span>
            </p>
            <p className="flex flex-wrap items-center justify-end gap-x-5">
              <span>
                사업자등록번호 : {ServiceInfo.businessRegistrationNumber}
              </span>
              <span>
                통신판매번호 : {ServiceInfo.communicationSalesReportNumber}
              </span>
            </p>
          </div>
        </div>
      </div>
      <hr className="w-full border-[#F0F0F0]" />
      <p className="text-5 text-footer">
        © dktechin Corp. All rights reserved.
      </p>
    </div>
  );
};

export default UserFooterContainer;
