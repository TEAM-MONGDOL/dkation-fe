'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import UserFileContainer from '@/_components/user/review/userFileContainer';
import RatingStar from '@/_components/user/review/userRatingStarContainer';
import { useGetReviewDetailQuery } from '@/_hooks/user/useGetReviewDetailQuery';
import { usePatchReviewMutation } from '@/_hooks/user/usePatchReviewMutation';

interface UserReviewEditPageProps {
  params: {
    id: number;
  };
}

const ReviewEditPage = ({ params }: UserReviewEditPageProps) => {
  const { id } = params;
  const router = useRouter();

  const { data } = useGetReviewDetailQuery({
    reviewId: id,
  });

  const [values, setValues] = useState({
    fileUrls: data?.reviewDetailInfo.imageUrls || [],
    contents: data?.reviewDetailInfo.contents || '',
    starRating: data?.reviewDetailInfo.rating || 0,
  });

  useEffect(() => {
    if (data) {
      setValues({
        fileUrls: data.reviewDetailInfo.imageUrls || [],
        contents: data.reviewDetailInfo.contents,
        starRating: data.reviewDetailInfo.rating,
      });
    }
  }, [data]);

  const { mutate: PatchReview } = usePatchReviewMutation({
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
    console.log('Files added:', fileUrls);
    setValues((prevValues) => ({
      ...prevValues,
      fileUrls,
    }));
  };

  const handleDeleteFile = (index: number) => {
    console.log('Deleting file at index:', index);
    setValues((prevValues) => {
      const updatedFileUrls = prevValues.fileUrls.filter(
        (_, idx) => idx !== index,
      );
      console.log('File URLs after delete:', updatedFileUrls);
      return {
        ...prevValues,
        fileUrls: updatedFileUrls,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting values:', values);

    PatchReview({
      reviewId: id,
      contents: values.contents,
      starRating: values.starRating,
      fileUrls: values.fileUrls,
      openedType: 'TRUE',
    });
  };

  return (
    <section className="px-40 pt-18">
      워케이션 정보 수정
      <hr />
      <form onSubmit={handleSubmit}>
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
                onDeleteFile={handleDeleteFile} // 파일 삭제를 부모 컴포넌트에서 처리
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
          <div className="flex justify-end gap-x-2 pt-6">
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
      </form>
    </section>
  );
};

export default ReviewEditPage;
