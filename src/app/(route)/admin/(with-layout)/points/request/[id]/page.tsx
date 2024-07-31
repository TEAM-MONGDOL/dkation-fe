'use client';

import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import InfoContentAtom from '@/_components/common/atoms/InfoContentAtom';
import FileModule from '@/_components/common/modules/FileModule';
import InputModule from '@/_components/common/modules/InputModule';
import ModalModule from '@/_components/common/modules/ModalModule';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const waitingData = {
  id: 1,
  status: 'WAITING',
  name: '홍길동',
  personalId: 'hong.gil',
  type: '봉사활동',
  createdAt: '2024.06.12',
  approvedAt: null,
  content: '봉사활동을 했습니다.',
  fileName: 'file.pdf',
  fileType: 'other',
  fileUrl: 'www.naver.com',
};

const acceptedData = {
  id: 1,
  status: 'ACCEPTED',
  name: '홍길동',
  personalId: 'hong.gil',
  type: '봉사활동',
  createdAt: '2024.06.12',
  approvedAt: '2024.06.13',
  content: '봉사활동을 했습니다.',
  fileName: 'file.pdf',
  fileType: 'other',
  fileUrl: 'www.naver.com',
};

const rejectedData = {
  id: 1,
  status: 'REJECTED',
  name: '홍길동',
  personalId: 'hong.gil',
  type: '봉사활동',
  createdAt: '2024.06.12',
  approvedAt: '2024.06.13',
  content: '봉사활동을 했습니다.',
  fileName: 'file.pdf',
  fileType: 'other',
  fileUrl: 'www.naver.com',
};

const data = waitingData;

const AdminPointsRequestDetailPage = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<'accept' | 'reject' | null>(
    null,
  );
  return (
    <section className="flex w-full flex-col gap-y-10 overflow-y-auto">
      <TitleBarModule title="포인트 신청 내역 상세" type="LEFT" />
      <section className="flex w-full flex-col gap-y-3xl">
        {data.status !== 'WAITING' && (
          <p
            className={`flex w-full items-center rounded-regular px-5 py-4 font-semibold ${data.status === 'ACCEPTED' ? 'border border-primary bg-[#FEEC66]' : 'border border-sub-100 bg-[#E1E1E1]'}`}
          >
            {data.status === 'ACCEPTED'
              ? '이미 승인된 내역입니다.'
              : '이미 반려된 내역입니다.'}
          </p>
        )}
        <div className="flex w-full flex-col gap-y-3xl">
          <div className="flex w-full items-center justify-around gap-x-3xl">
            <InputModule
              subtitle="회원 정보"
              value={`${data.name} (${data.personalId})`}
              status="readonly"
            />
            <InputModule subtitle="분류" value={data.type} status="readonly" />
          </div>
          <div className="flex w-full items-center justify-around gap-x-3xl">
            <InputModule
              subtitle="신청 일시"
              value={data.createdAt}
              status="readonly"
            />
            <InputModule
              subtitle="지급 일시"
              value={!data.approvedAt ? '-' : data.approvedAt}
              status="disabled"
            />
          </div>
          <div className="flex h-full grow flex-col gap-y-[30px]">
            <div className="flex flex-col gap-y-4">
              <h3 className="font-bold">증빙 서류</h3>
              <FileModule
                fileName={data.fileName}
                fileType="other"
                fileUrl={data.fileUrl}
                buttonType="download"
                onDownload={() => {}}
              />
            </div>
            <TextAreaModule
              placeholder="내용을 입력하세요."
              size="SMALL"
              maxLength={500}
              value={data.content}
              name="content"
              onChange={() => {}}
              readonly
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-end gap-x-5 pt-[30px]">
          {/* TODO : 좀 더 길게 버튼 길이 고정 필요 */}
          {data.status === 'WAITING' ? (
            <>
              <ButtonAtom
                type="button"
                buttonStyle="dark"
                onClick={() => {
                  setIsModalOpen('reject');
                }}
                text="반려"
              />
              <ButtonAtom
                type="button"
                buttonStyle="yellow"
                onClick={() => {
                  setIsModalOpen('accept');
                }}
                text="승인"
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
            />
          )}
        </div>
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
                <div className="flex w-full flex-col items-start gap-y-5">
                  <InfoContentAtom
                    isStartAlign
                    data={{ subtitle: '구분', content: data.type }}
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
              </div>
            </ModalModule>
          ))}
      </section>
    </section>
  );
};

export default AdminPointsRequestDetailPage;
