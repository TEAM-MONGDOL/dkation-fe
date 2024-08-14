'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import UserFileContainer from '@/_components/user/review/userFileContainer';
import RatingStar from '@/_components/user/review/userRatingStarContainer';
import { useGetReviewDetailQuery } from '@/_hooks/user/useGetReviewDetailQuery';
import { usePatchReviewMutation } from '@/_hooks/user/usePatchReviewMutation';
import CheckboxAtom from '@/_components/common/atoms/CheckboxAtom';
import ReviewWktInfo from '@/_components/user/mypage/ReviewWktInfo';
import UserLoading from '@/_components/user/userLoading';
import NetworkError from '@/_components/common/networkError'; // Import CheckboxAtom

interface UserReviewEditPageProps {
  params: {
    id: number;
  };
}

const ReviewEditPage = ({ params }: UserReviewEditPageProps) => {
  const { id } = params;
  const router = useRouter();

  const { data, isLoading, isError } = useGetReviewDetailQuery({
    reviewId: id,
  });

  if (isLoading) <UserLoading />;
  if (isError) <NetworkError />;
  if (!data) <NetworkError />;

  const [values, setValues] = useState({
    fileUrls: data?.reviewDetailInfo.imageUrls || [],
    contents: data?.reviewDetailInfo.contents || '',
    starRating: data?.reviewDetailInfo.rating || 0,
    openedType: data?.reviewDetailInfo.openedType || '',
  });

  const [isChecked, setIsChecked] = useState(values.openedType === 'FALSE');

  useEffect(() => {
    if (data) {
      setValues({
        fileUrls: data.reviewDetailInfo.imageUrls || [],
        contents: data.reviewDetailInfo.contents,
        starRating: data.reviewDetailInfo.rating,
        openedType: data.reviewDetailInfo.openedType || '',
      });
      setIsChecked(data.reviewDetailInfo.openedType === 'FALSE');
    }
  }, [data]);

  const { mutate: PatchReview } = usePatchReviewMutation({
    reviewId: id,
    successCallback: () => {
      alert('후기가 수정되었습니다.');
      router.push('/mypage/review');
    },
    errorCallback: (error: Error) => {
      console.error('후기 수정 실패 :', error);
      alert('후기 수정에 실패했습니다.');
    },
  });

  const handleFilesChange = (fileUrls: string[]) => {
    setValues((prevValues) => ({
      ...prevValues,
      fileUrls,
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

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setValues((prevValues) => ({
      ...prevValues,
      openedType: !isChecked ? 'FALSE' : 'TRUE',
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    PatchReview({
      contents: values.contents,
      starRating: values.starRating,
      fileUrls: values.fileUrls,
      openedType: values.openedType,
    });
  };

  return (
    <section className="px-40 pt-18">
      <ReviewWktInfo wktId={Number(data?.reviewDetailInfo.wktId)} />
      <hr />
      <form onSubmit={handleSubmit} className="px-10">
        <div className="pt-10">
          <div className="flex flex-col gap-y-7 py-8">
            <p className="mb-4 text-h2 font-semibold">
              이번 워케이션 장소 어때요?
            </p>
            <RatingStar
              rating={values.starRating}
              onRatingChange={(newRating) =>
                setValues((prevValues) => ({
                  ...prevValues,
                  starRating: newRating,
                }))
              }
            />
          </div>
          <div className="flex flex-col">
            <p className="mb-2 text-h2 font-semibold">어떤 점이 좋았나요?</p>
            <div className="flex flex-col gap-y-4 py-7">
              <UserFileContainer
                fileUrls={values.fileUrls}
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
                  setValues((prevValues) => ({
                    ...prevValues,
                    contents: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-x-2">
              <CheckboxAtom
                isChecked={isChecked}
                onClick={handleCheckboxChange}
                size={24}
              />
              <span>익명으로 작성하기</span>
            </div>
            <div className="flex gap-x-2">
              <UserButtonAtom
                size="xl"
                buttonStyle="white"
                text="취소"
                type="button"
                className="rounded-lg"
                onClick={() => router.back()}
              />
              <UserButtonAtom
                size="xl"
                buttonStyle="black"
                text="수정"
                type="submit"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ReviewEditPage;
