'use client';

import { KeyboardArrowLeftIcon } from '@/_assets/icons';
import FileModule from '@/_components/common/modules/FileModule';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import UserArticleHeaderAtom from '@/_components/user/common/atoms/UserArticleHeaderAtom';
import UserArticleRowAtom from '@/_components/user/common/atoms/UserArticleRowAtom';
import NegativeLabel from '@/_components/user/points/NegativeLabel';
import PendingLabel from '@/_components/user/points/PendingLabel';
import PositiveLabel from '@/_components/user/points/PositiveLabel';
import { useGetPointApplyDetailQuery } from '@/_hooks/admin/useGetPointApplyDetailQuery';
import { dateConverter } from '@/_types/converter';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface PointsApplyDetailPageProps {
  params: {
    id: string;
  };
}

const PointsApplyDetailPage = ({ params }: PointsApplyDetailPageProps) => {
  const { id } = params;
  const router = useRouter();
  const { data, isLoading, isError } = useGetPointApplyDetailQuery({
    id: Number(id),
  });

  return (
    <section className="flex w-full flex-col gap-y-14 px-40 pb-20 pt-18">
      <div className="flex w-full items-center gap-x-4">
        <Image
          className="cursor-pointer"
          src={KeyboardArrowLeftIcon}
          alt="뒤로가기"
          width={36}
          height={36}
          onClick={() => router.back()}
        />
        <h2 className="text-h2 font-semibold text-sub-400">
          포인트 신청 내역 상세
        </h2>
      </div>
      {!data ? (
        isLoading ? (
          <div>로딩 중...</div>
        ) : isError ? (
          <div>에러 발생</div>
        ) : (
          <div>데이터 없음</div>
        )
      ) : (
        <div className="flex w-full flex-col">
          <UserArticleHeaderAtom>
            <div className="flex h-full w-full items-center gap-x-5 px-4 text-sub-400">
              <span className="text-2 font-semibold">구분</span>
              <div className="h-1/4 w-px bg-sub-100" />
              <span className="grow text-2 font-semibold">
                {data.pointTitle}
              </span>
              <div className="h-1/4 w-px bg-sub-100" />
              <span className="text-2 font-semibold">구분</span>
              <div className="h-1/4 w-px bg-sub-100" />
              {data.applyType === 'APPROVED' ? (
                <PositiveLabel text="승인" />
              ) : data.applyType === 'DECLINED' ? (
                <NegativeLabel text="반려" />
              ) : (
                <PendingLabel text="대기중" />
              )}
            </div>
          </UserArticleHeaderAtom>
          <UserArticleRowAtom
            leftTitle="신청일"
            leftContent={dateConverter(data.createdAt)}
          />
          <UserArticleRowAtom
            leftTitle="심사일"
            leftContent={dateConverter(data.reviewTime || '-')}
          />
          <div className="flex w-full flex-col py-5">
            {data.fileInfo && (
              <FileModule
                isUser
                key={data.fileInfo.url}
                fileName={data.fileInfo.fileName}
                preview={data.fileInfo.url}
                fileType={
                  data.fileInfo.fileName.endsWith('.png') ||
                  data.fileInfo.fileName.endsWith('.jpg') ||
                  data.fileInfo.fileName.endsWith('.jpeg')
                    ? 'image'
                    : 'other'
                }
                buttonType="download"
              />
            )}
            {data.applyType === 'DECLINED' && (
              <div className="mb-20 mt-8 flex w-full flex-col gap-y-6">
                <h2 className="text-2 font-semibold">반려사유</h2>
                <TextAreaModule
                  name="declineReason"
                  size="MEDIUM"
                  value={data.declineReason || '반려 사유가 없습니다.'}
                  readonly
                />
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default PointsApplyDetailPage;
