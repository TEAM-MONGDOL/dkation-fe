'use client';

import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import { useRouter } from 'next/navigation';
import { StarRateEmptyIcon, StarRateIcon } from '@/_assets/icons';
import Image from 'next/image';
import { useGetWkReviewListQuery } from '@/_hooks/admin/useGetWkReviewDetailQuery';
import React from 'react';
import dayjs from 'dayjs';
import { usePatchWkReviewMutation } from '@/_hooks/admin/usePatchWkReviewMutation';

interface WkDetailProps {
  params: { id: number };
}

const AdminWorkationReviewDetailPage = ({ params }: WkDetailProps) => {
  const router = useRouter();
  const { id } = params;
  const successCallback = () => {
    alert('리뷰 블라인드 완료');
    router.push('/admin/workation/review');
  };
  const patchReviewQuery = usePatchWkReviewMutation(successCallback);
  const { data, isLoading, isError } = useGetWkReviewListQuery({
    reviewId: id,
  });
  if (isLoading) {
    return <div>Loading...</div>; // 로딩컴포넌트 추가시 변경예정
  }
  if (isError) {
    return <div>Error loading data</div>; // 에러컴포넌트 추가시 변경예정
  }
  if (!data) {
    return <div>No data</div>;
  }
  const handleConfirmBlind = () => {
    const patchData = {
      id,
      blindedType: data.reviewDetailInfo.blindedType,
    };
    patchReviewQuery.mutate(patchData);
  };

  return (
    <div className="">
      <TitleBarModule title="후기 상세" type="LEFT" />
      <div className="my-10 rounded-regular border">
        <div className="flex flex-col px-8">
          <div className="my-5 flex items-center">
            <p className="mr-3 text-h3 font-semibold">
              {data.reviewDetailInfo.reviewer}
            </p>
            <p className="text-4 text-sub-200">
              {data.reviewDetailInfo.department} +{' '}
              {data.reviewDetailInfo.wktTitle}
            </p>
            <div className="ml-auto flex justify-center">
              <div className="flex justify-center">
                {[...Array(data.reviewDetailInfo.rating)].map((_, index) => (
                  <Image
                    key={data.reviewDetailInfo.id}
                    src={StarRateIcon}
                    alt="StarRateIcon"
                  />
                ))}
                {[...Array(5 - data.reviewDetailInfo.rating)].map(
                  (_, index) => (
                    <Image
                      key={data.reviewDetailInfo.id}
                      src={StarRateEmptyIcon}
                      alt="StarRateEmptyIcon"
                    />
                  ),
                )}
              </div>
            </div>
          </div>
          <hr />
          {data.reviewDetailInfo.imageUrls
            .filter((url) => url !== null)
            .map((url) => (
              <Image width={188} height={188} key="url" src={url} alt="image" />
            ))}
          <p className="pb-14 pt-7">{data.reviewDetailInfo.contents}</p>
        </div>
        <div className="flex justify-end bg-sub-100/10 px-8 py-3">
          {dayjs(data.reviewDetailInfo.lastModifiedAt).format('YYYY.MM.DD')}
        </div>
      </div>
      <div className="mt-24 flex justify-end">
        <ButtonAtom
          text="블라인드"
          type="submit"
          width="fixed"
          buttonStyle="red"
          onClick={handleConfirmBlind}
        />
      </div>
    </div>
  );
};

export default AdminWorkationReviewDetailPage;
