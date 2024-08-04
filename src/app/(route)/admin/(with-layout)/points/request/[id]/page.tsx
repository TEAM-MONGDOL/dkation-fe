'use client';

import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import InfoContentAtom from '@/_components/common/atoms/InfoContentAtom';
import FileModule from '@/_components/common/modules/FileModule';
import InputModule from '@/_components/common/modules/InputModule';
import ModalModule from '@/_components/common/modules/ModalModule';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import { useGetPointApplyDetailQuery } from '@/_hooks/admin/useGetPointApplyDetailQuery';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface AdminPointsRequestDetailPageProps {
  params: {
    id: string;
  };
}

const AdminPointsRequestDetailPage = ({
  params,
}: AdminPointsRequestDetailPageProps) => {
  const { id } = params;
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<'accept' | 'reject' | null>(
    null,
  );
  const { data, isLoading, isError } = useGetPointApplyDetailQuery({
    id: Number(id),
  });

  return (
    <section className="flex w-full flex-col gap-y-10 overflow-y-auto">
      <TitleBarModule title="포인트 신청 내역 상세" type="LEFT" />
      <section className="flex w-full flex-col gap-y-3xl">
        {data && data.applyType !== 'PENDING' && (
          <p
            className={`flex w-full items-center rounded-regular px-5 py-4 font-semibold ${data?.applyType === 'APPROVED' ? 'border border-primary bg-[#FEEC66]' : 'border border-sub-100 bg-[#E1E1E1]'}`}
          >
            {data?.applyType === 'APPROVED'
              ? '이미 승인된 내역입니다.'
              : '이미 반려된 내역입니다.'}
          </p>
        )}
        {!data ? (
          isLoading ? (
            <p className="flex h-[100px] w-full items-center justify-center">
              로딩 중...
            </p>
          ) : isError ? (
            <p className="flex h-[100px] w-full items-center justify-center">
              에러가 발생했습니다.
            </p>
          ) : (
            <p className="flex h-[100px] w-full items-center justify-center">
              알 수 없는 에러가 발생했습니다.
            </p>
          )
        ) : (
          <>
            <div className="flex w-full flex-col gap-y-3xl">
              <div className="flex w-full items-center justify-around gap-x-3xl">
                <InputModule
                  subtitle="회원 정보"
                  value={`${data.name} (${data.accountId})`}
                  status="readonly"
                />
                <InputModule
                  subtitle="분류"
                  value={data.pointTitle}
                  status="readonly"
                />
              </div>
              <div className="flex w-full items-center justify-around gap-x-3xl">
                <InputModule
                  subtitle="신청 일시"
                  value={data.createdAt}
                  status="readonly"
                />
                <InputModule
                  subtitle="지급 일시"
                  value={!data.createdAt ? '-' : data.createdAt} // TODO : 지급 일시 API 필요
                  status="disabled"
                />
              </div>
              <div className="flex h-full grow flex-col gap-y-[30px]">
                {data.fileInfo && (
                  <div className="flex flex-col gap-y-4">
                    <h3 className="font-bold">증빙 서류</h3>
                    <FileModule
                      fileName={data.fileInfo.fileName}
                      fileType="other"
                      fileUrl={data.fileInfo.url}
                      buttonType="download"
                      onDownload={() => {}}
                    />
                  </div>
                )}
                <TextAreaModule
                  placeholder="내용을 입력하세요."
                  size="SMALL"
                  value={data.description}
                  name="content"
                  onChange={() => {}}
                  readonly
                />
              </div>
            </div>
            <div className="flex w-full items-center justify-end gap-x-5 pt-[30px]">
              {data.applyType === 'PENDING' ? (
                <>
                  <ButtonAtom
                    type="button"
                    buttonStyle="dark"
                    onClick={() => {
                      setIsModalOpen('reject');
                    }}
                    text="반려"
                    width="fixed"
                  />
                  <ButtonAtom
                    type="button"
                    buttonStyle="yellow"
                    onClick={() => {
                      setIsModalOpen('accept');
                    }}
                    text="승인"
                    width="fixed"
                  />
                </>
              ) : (
                <ButtonAtom
                  type="button"
                  buttonStyle="dark"
                  onClick={() => {
                    router.back();
                  }}
                  text="닫기"
                  width="fixed"
                />
              )}
            </div>
          </>
        )}
        {isModalOpen &&
          (isModalOpen === 'accept' ? (
            <ModalModule
              title="포인트 신청 승인"
              onCancel={() => {
                setIsModalOpen(null);
              }}
              onConfirm={() => {
                // API 호출 필요
                alert('승인');
              }}
            >
              해당 포인트 신청을 승인하시겠습니까?
            </ModalModule>
          ) : (
            <ModalModule
              title="포인트 신청 반려"
              onCancel={() => {
                setIsModalOpen(null);
              }}
              onConfirm={() => {
                // API 호출 필요
                alert('반려');
              }}
              infoText="* 반려할 경우 반려사유와 함께 사용자에게 포인트 신청 반려 안내 메일이 발송됩니다. "
            >
              <div className="flex w-full flex-col gap-y-5">
                <div className="flex w-full flex-col items-start gap-y-5">
                  <h4 className="font-semibold text-sub-300">반려 사유 작성</h4>
                  <TextAreaModule
                    placeholder="반려 사유를 입력하세요."
                    size="MEDIUM"
                    maxLength={100}
                    value=""
                    name="rejectReason"
                    onChange={() => {}}
                    bgColor="bg-cus-100"
                  />
                </div>
                {data && (
                  <div className="flex w-full flex-col items-start gap-y-5">
                    <InfoContentAtom
                      isStartAlign
                      data={{ subtitle: '구분', content: data.pointTitle }}
                    />
                    <InfoContentAtom
                      isStartAlign
                      data={{ subtitle: '신청자', content: data.name }}
                    />
                    <InfoContentAtom
                      isStartAlign
                      data={{ subtitle: '신청 일시', content: data.createdAt }}
                    />
                  </div>
                )}
              </div>
            </ModalModule>
          ))}
      </section>
    </section>
  );
};

export default AdminPointsRequestDetailPage;
