'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import RatingStar from '@/_components/user/review/userRatingStarContainer';
import { useGetReviewDetailQuery } from '@/_hooks/user/useGetReviewDetailQuery';

interface UserReviewDetailPageProps {
  params: {
    id: number;
  };
}

const UserReviewDetailPage = ({ params }: UserReviewDetailPageProps) => {
  const { id } = params;
  const router = useRouter();
  const [values, setValues] = useState({
    fileUrls: [] as string[],
    contents: '',
    starRating: 0,
  });

  const { data, isLoading, isError } = useGetReviewDetailQuery({
    reviewId: id,
  });

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
                  onClick={() => router.back()}
                />
                <UserButtonAtom
                  size="xl"
                  buttonStyle="black"
                  text="수정"
                  type="submit"
                  className="rounded-lg"
                  onClick={() => router.push(`/mypage/review/${id}/edit`)}
                />
              </div>
            </>
          )}
        </div>
      </form>
    </section>
  );
};

export default UserReviewDetailPage;
