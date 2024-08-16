'use client';

import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import { useGetPointPolicyQuery } from '@/_hooks/admin/useGetPointPolicyQuery';
import { useState } from 'react';
import Image from 'next/image';
import { DownArrowIcon } from '@/_assets/icons';
import { dateConverter } from '@/_types/converter';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import { useGetPointPolicyDetailListQuery } from '@/_hooks/user/useGetPointsPolicyDetailListQuery';
import UserLoading from '@/_components/user/userLoading';
import NetworkError from '@/_components/common/networkError';

const PointsPolicyPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentOpen, setCurrentOpen] = useState<number | null>(null);
  const {
    data: policyList,
    isLoading: policyListIsLoading,
    isError: policyListIsError,
  } = useGetPointPolicyQuery({
    pageable: {
      page: currentPage,
      size: 5,
      sort: 'lastModifiedAt,DESC',
    },
  });
  const policyDetailList = useGetPointPolicyDetailListQuery({
    ids: policyList?.pointPolicyList.map((item) => item.id) || [],
    enable: policyList !== undefined,
  });

  const getPolicyDetail = (title: string) => {
    const detail = policyDetailList.find(
      (content) => content.data?.policyTitle === title,
    );
    return detail && detail.data ? detail.data.detail : '';
  };

  return (
    <section className="flex w-full flex-col gap-y-14 px-40 pb-20 pt-18">
      <h2 className="text-h2 font-semibold text-sub-400">포인트 정책</h2>
      <div className="flex w-full flex-col gap-y-[200px]">
        <div className="flex w-full flex-col gap-y-2.5">
          <div className="flex h-10 w-full items-center justify-center gap-x-7 rounded bg-sub-100/20 px-6 text-center text-4 text-sub-300 xl:px-10">
            <p className="w-1/12 shrink-0">번호</p>
            <p className="grow">분류</p>
            <p className="w-2/12 shrink-0">점수</p>
            <p className="w-2/12 shrink-0">등록 일시</p>
            <p className="w-1/12 shrink-0" />
          </div>
          <div className="flex w-full flex-col gap-y-2.5">
            {!policyList ? (
              policyListIsLoading ? (
                <UserLoading />
              ) : policyListIsError ? (
                <NetworkError />
              ) : (
                <NetworkError />
              )
            ) : policyList.pointPolicyList.length < 1 ? (
              <EmptyContainer notTable />
            ) : (
              policyList.pointPolicyList.map((item, idx) => (
                <div className="flex w-full flex-col" key={item.policyTitle}>
                  <div
                    role="presentation"
                    key={item.id}
                    className="flex h-[63px] w-full cursor-pointer items-center justify-center gap-x-7 rounded border border-stroke-100 bg-white px-6 text-center font-medium text-sub-400 xl:px-10"
                    onClick={() => {
                      setCurrentOpen(currentOpen === item.id ? null : item.id);
                    }}
                  >
                    <p className="w-1/12 shrink-0">
                      {(currentPage - 1) * 5 + idx + 1}
                    </p>
                    <p className="grow">{item.policyTitle}</p>
                    <p className="w-2/12 shrink-0">
                      {item.quantity.toLocaleString()}
                    </p>
                    <p className="w-2/12 shrink-0">
                      {dateConverter(item.modifiedAt)}
                    </p>
                    <div className="flex w-1/12 justify-center">
                      <Image
                        src={DownArrowIcon}
                        alt="policy-toggle"
                        className={`transition-transform duration-300 ${currentOpen === item.id ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </div>
                  <div
                    className={`transition-max-height overflow-hidden duration-500 ease-in-out ${currentOpen === item.id ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} w-full`}
                  >
                    <div className="my-2.5 w-full rounded bg-sub-100/10 px-6 py-7 text-sub-300">
                      {getPolicyDetail(item.policyTitle)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {policyList && policyList.pageInfo.totalElements > 0 && (
          <div className="flex w-full items-center justify-center">
            <PaginationModule
              totalPages={policyList.pageInfo.totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              user
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default PointsPolicyPage;
