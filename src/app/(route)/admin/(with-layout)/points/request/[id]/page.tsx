'use client';

import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import FileModule from '@/_components/common/modules/FileModule';
import InputModule from '@/_components/common/modules/InputModule';
import ModalModule from '@/_components/common/modules/ModalModule';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
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

const data = acceptedData;

const AdminPointsRequestDetailPage = () => {
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
              {/* TODO : 높이 조절 필요 */}
              <FileModule
                fileName={data.fileName}
                fileType="other"
                fileUrl={data.fileUrl}
                buttonType="download"
                onDownload={() => {}}
              />
            </div>
            {/* TODO : Readonly, 카운트 조건부, height 필요 */}
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
              onClick={() => {
                setIsModalOpen(null);
              }}
            >
              해당 신청을 승인하시겠습니까?
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
              onClick={() => {
                setIsModalOpen(null);
              }}
            >
              해당 신청을 반려하시겠습니까?
            </ModalModule>
          ))}
      </section>
    </section>
  );
};

export default AdminPointsRequestDetailPage;
