'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import UserFileContainer from '@/_components/user/review/userFileContainer';
import RatingStar from '@/_components/user/review/userRatingStarContainer';
import { useGetUserWkDetailQuery } from '@/_hooks/user/useGetUserWkDetailQuery';
import dayjs from 'dayjs';
import Image from 'next/image';

const WriteNoticesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('wktId');
  const [rating, setRating] = useState<number>(0);
  const [values, setValues] = useState({
    fileUrls: [] as string[],
    contents: '',
    starRating: 0,
  });

  const { data, isLoading, isError } = useGetUserWkDetailQuery({
    wktId: Number(id),
  });

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setValues((prevValues) => ({
      ...prevValues,
      starRating: newRating,
    }));
  };

  const handleFilesChange = (fileUrls: string[]) => {
    setValues((prevValues) => ({
      ...prevValues,
      fileUrls: [...prevValues.fileUrls, ...fileUrls],
    }));
  };

  const handleDeleteFile = (index: number) => {
    setValues((prevValues) => {
      const updatedFileUrls = prevValues.fileUrls.filter(
        (_, idx) => idx !== index,
      );
      return {
        ...prevValues,
        fileUrls: updatedFileUrls,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <section className="px-40 pt-18">
      <div className="mb-16 flex px-12">
        <div className="flex-shrink-0">
          {data?.files && data.files.length > 0 && (
            <Image
              src={data.files[0].url}
              alt={data.files[0].fileName}
              width={442}
              height={304}
              className="mr-4"
            />
          )}
        </div>
        <div className="flex flex-grow flex-col justify-between px-2">
          <div>
            <p className="text-sub-300">{data?.title}</p>
            <h2 className="text-h2 font-semibold text-sub-400">
              {data?.place}
            </h2>
          </div>
          <div className="mt-auto">
            <p className="mb-0.5">
              모집 기간 : {dayjs(data?.applyStartDate).format('YYYY.MM.DD')} -{' '}
              {dayjs(data?.applyEndDate).format('YYYY.MM.DD')}
            </p>
            <p className="mb-0.5">
              워케이션 기간 : {dayjs(data?.startDate).format('YYYY.MM.DD')} -{' '}
              {dayjs(data?.endDate).format('YYYY.MM.DD')}
            </p>
            <p>모집인원 : {data?.totalRecruit}명</p>
          </div>
        </div>
      </div>

      <hr />
      <form onSubmit={handleSubmit} className="px-10">
        <div className="pt-10">
          <div className="flex flex-col gap-y-7 py-8">
            <p className="mb-4 text-h2 font-semibold">
              이번 워케이션 장소 어때요?
            </p>
            <RatingStar rating={rating} onRatingChange={handleRatingChange} />
          </div>
          <div className="flex flex-col">
            <p className="mb-2 text-h2 font-semibold">어떤 점이 좋았나요?</p>
            <div className="flex flex-col gap-y-4 py-7">
              <UserFileContainer
                onFileChange={handleFilesChange}
                fileDomainType="REVIEW"
                onDeleteFile={handleDeleteFile}
              />
              <TextAreaModule
                name="contents"
                placeholder="내용을 입력하세요."
                size="LARGE"
                maxLength={500}
                value={values.contents}
                onChange={(e) =>
                  setValues({ ...values, contents: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-x-2 pt-6">
            <UserButtonAtom
              size="xl"
              buttonStyle="white"
              text="취소"
              type="button"
              className="rounded-lg"
              onClick={() => router.push('/admin/notices')}
            />
            <UserButtonAtom
              size="xl"
              buttonStyle="black"
              text="등록"
              type="submit"
              className="rounded-lg"
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default WriteNoticesPage;
