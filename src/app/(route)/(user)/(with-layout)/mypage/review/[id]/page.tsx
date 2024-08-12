'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import RatingStar from '@/_components/user/review/userRatingStarContainer';
import { useGetReviewDetailQuery } from '@/_hooks/user/useGetReviewDetailQuery';
import { useDeleteReviewMutation } from '@/_hooks/user/useDeleteReviewMutation';
import UserModalTextAtom from '@/_components/user/common/atoms/UserModalTextAtom';
import UserModalAtom from '@/_components/user/common/atoms/UserModalAtom';

interface UserReviewDetailPageProps {
  params: {
    id: number;
  };
}

const UserReviewDetailPage = ({ params }: UserReviewDetailPageProps) => {
  const { id } = params;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();

  const { data, isLoading, isError } = useGetReviewDetailQuery({
    reviewId: id,
  });

  const { mutate: deleteReview } = useDeleteReviewMutation({
    successCallback: () => {
      alert('삭제가 완료되었습니다.');
      setIsDeleteModalOpen(false);
      router.replace('/mypage/review');
    },
  });

  const closeModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <section className="px-40 pt-18">
      워케이션 정보
      <hr />
      <form>
        <div className="pt-10">
          {!data ? (
            isLoading ? (
              <div>로딩 중...</div>
            ) : isError ? (
              <div>에러 발생</div>
            ) : null
          ) : (
            <>
              <div className="flex flex-col gap-y-7 py-8">
                <p className="mb-4 text-h2 font-semibold">
                  이번 워케이션 장소 어때요?
                </p>
                <RatingStar readonly rating={data.reviewDetailInfo.rating} />
              </div>

              <div className="flex flex-col">
                <p className="mb-2 text-h2 font-semibold">
                  어떤 점이 좋았나요?
                </p>
                {data.reviewDetailInfo.imageUrls &&
                  data.reviewDetailInfo.imageUrls.length > 0 && (
                    <div className="flex gap-x-3">
                      {data.reviewDetailInfo.imageUrls.map((url) =>
                        url ? (
                          <div key={url} className="py-3">
                            <Image
                              src={url}
                              alt="Review Image"
                              width={112}
                              height={112}
                              className="h-44 w-44 rounded-lg object-cover"
                            />
                          </div>
                        ) : null,
                      )}
                    </div>
                  )}
                <div className="flex flex-col gap-y-4 py-4">
                  <TextAreaModule
                    readonly
                    name="contents"
                    placeholder="내용이 존재하지 않습니다."
                    size="LARGE"
                    maxLength={500}
                    value={data.reviewDetailInfo.contents}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-x-2 pt-6">
                <UserButtonAtom
                  size="xl"
                  buttonStyle="red"
                  text="삭제"
                  type="button"
                  className="rounded-lg"
                  onClick={() => setIsDeleteModalOpen(true)}
                />
                <UserButtonAtom
                  size="xl"
                  buttonStyle="black"
                  text="수정"
                  type="button"
                  className="rounded-lg"
                  onClick={() => router.push(`/mypage/review/${id}/edit`)}
                />
              </div>
            </>
          )}
        </div>
        {isDeleteModalOpen && (
          <UserModalAtom onClose={closeModal}>
            <UserModalTextAtom className="text-2">
              리뷰를 삭제하시겠습니까?
            </UserModalTextAtom>
            <div className="mt-6 flex justify-center gap-x-2">
              <UserButtonAtom
                text="취소"
                buttonStyle="lightGray"
                size="md"
                onClick={closeModal}
                className="rounded-md"
                type="button"
              />
              <UserButtonAtom
                text="삭제"
                buttonStyle="yellow"
                size="md"
                onClick={() => deleteReview(id)}
                className="rounded-md"
                type="button"
              />
            </div>
          </UserModalAtom>
        )}
      </form>
    </section>
  );
};

export default UserReviewDetailPage;
