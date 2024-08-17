'use client';

import WkBannerPeriodModule from '@/_components/user/common/modules/WkBannerPeriodModule';
import Image from 'next/image';
import { LocationIcon } from '@/_assets/icons';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import React, { useState } from 'react';
import { useGetMemberDetailQuery } from '@/_hooks/common/useGetMemberDetailQuery';
import { useSession } from 'next-auth/react';
import { useGetUserWkDetailQuery } from '@/_hooks/user/useGetUserWkDetailQuery';
import dayjs from 'dayjs';
import { usePostUserWkApplyMutation } from '@/_hooks/user/usePostUserWkApplyMutation';
import { useRouter } from 'next/navigation';
import UserLoading from '@/_components/user/userLoading';
import NetworkError from '@/_components/common/networkError';
import { useGetWinningPercentageQuery } from '@/_hooks/user/useGetWinningPercentageQuery';

interface Props {
  params: { id: number };
}

const UserWkApplyPage = ({ params }: Props) => {
  const router = useRouter();
  const [point, setPoint] = useState<number>(0);
  const { id } = params;
  const session = useSession();
  const accountId = String(session.data?.accountId || '');
  const {
    data: myPointData,
    isLoading: myPointIsLoading,
    isError: myPointIsError,
  } = useGetMemberDetailQuery({
    accountId,
    enable: !!session.data,
  });

  const {
    data: pointData,
    isLoading: pointIsLoading,
    isError: pointIsError,
  } = useGetWinningPercentageQuery({ wktId: id, point, enable: point > 0 });

  const { data, isLoading, isError } = useGetUserWkDetailQuery({
    wktId: id,
  });

  const { mutate: postWkApply } = usePostUserWkApplyMutation({
    successCallback: () => {
      router.push('/workation/success');
    },
  });

  if (isLoading || myPointIsLoading) {
    return <UserLoading />;
  }
  if (isError || myPointIsError || pointIsError) {
    return <NetworkError />;
  }
  if (!data || !myPointData) {
    return <NetworkError />;
  }

  const handlePostApplyWk = () => {
    if (point === 0) {
      alert('포인트를 입력해주세요.');
      return;
    }
    postWkApply({
      wktId: id,
      usedPoint: point,
    });
  };

  const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numericValue = Number(value);

    if (numericValue <= (myPointData?.pointQuantity || 0)) {
      setPoint(numericValue);
    } else {
      alert(`${myPointData?.pointQuantity}포인트 이하로 입력하세요.`);
    }
  };

  return (
    <section>
      <div className="">
        <div className="flex h-[450px] justify-center gap-16 bg-primary/5 px-36 py-12">
          <Image
            src={data?.files[0].url || ''}
            alt="place"
            width={530}
            height={1}
            className="rounded-lg"
          />
          <div className="ml-auto pr-16 pt-52">
            <p className="text-2">{data?.title}</p>
            <p className="mb-4 text-h1 font-semibold">{data?.place}</p>
            <div className="flex gap-2">
              <Image
                className="mb-auto mt-1"
                src={LocationIcon}
                alt="LocationIcon"
              />
              <p className="text-2">주소 : {data?.address}</p>
            </div>
          </div>
        </div>
        <WkBannerPeriodModule
          applyStartDate={dayjs(data?.applyStartDate).format('YYYY.MM.DD')}
          applyEndDate={dayjs(data?.applyEndDate).format('YYYY.MM.DD')}
          startDate={dayjs(data?.startDate).format('YYYY.MM.DD')}
          endDate={dayjs(data?.endDate).format('YYYY.MM.DD')}
        />
      </div>
      <div className="mb-48 mt-28 flex items-center justify-between px-60">
        <div>
          <p className="mb-10 text-h2 font-semibold">나의 당첨 확률</p>
          <div className="flex items-end justify-center gap-10 rounded-[17px] border border-[#E5CD07] bg-gradient-to-r from-primary/5 to-primary/60 px-9 pb-2.5">
            <p className="text-[78px] font-bold">
              {pointData?.percentage || 0}%
            </p>
            <p className="mb-5 text-h3 text-[#E5CD07]">±{pointData?.error}%</p>
          </div>
        </div>
        <div className="mt-20 flex flex-col gap-2">
          <div className="flex items-center gap-12">
            <p className="text-1">내 포인트</p>
            <input
              value={Number(myPointData?.pointQuantity)}
              className="h-12 w-[225px] cursor-not-allowed rounded-[4px] border pl-4"
              type="number"
              readOnly
            />
          </div>
          <div className="flex items-center gap-7">
            <p className="text-1">배팅 포인트</p>
            <input
              className="h-12 w-[225px] rounded-[4px] border pl-4 outline-0"
              placeholder="0"
              value={point > 0 ? point : ''}
              onChange={handlePointChange}
              type="number"
            />
            <UserButtonAtom
              className="rounded-[8px]"
              text="신청하기"
              size="md"
              buttonStyle="black"
              onClick={handlePostApplyWk}
              type="submit"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserWkApplyPage;
