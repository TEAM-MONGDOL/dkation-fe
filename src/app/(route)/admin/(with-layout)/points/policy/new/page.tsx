'use client';

import { InfoIcon } from '@/_assets/icons';
import PointPolicyInfoModule from '@/_components/admin/points/modules/PointPolicyInfoModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import InputAreaAtom from '@/_components/common/atoms/InputAreaAtom';
import InfoSectionContainer from '@/_components/common/containers/InfoSectionContainer';
import InputModule from '@/_components/common/modules/InputModule';
import ModalModule from '@/_components/common/modules/ModalModule';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const AdminPointsPolicyNewPage = () => {
  const router = useRouter();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  return (
    <div className="w-full flex flex-col gap-y-10 overflow-y-auto">
      <TitleBarModule title="포인트 정책 추가" type="LEFT" />
      <section className="w-full flex flex-col gap-y-[60px]">
        <div className="w-full flex flex-col gap-y-[30px]">
          <div className="w-full flex gap-x-[30px] items-center">
            <div className="flex-1">
              <InputModule
                subtitle="분류"
                placeholder="분류를 입력해주세요."
                textCount={20}
              />
            </div>
            <div className="flex-1">
              <InputModule
                subtitle="포인트"
                placeholder="지급할 포인트를 입력해주세요."
                textCount={20}
              />
            </div>
          </div>
          <div className="w-full flex gap-x-[30px] items-center">
            <div className="flex-1">
              {/* TODO : ReadOnly 및 background 필요 */}
              <InputModule
                subtitle="등록일시"
                value={dayjs().format('YYYY.MM.DD')}
              />
            </div>
            <div className="flex-1" />
          </div>
          <div className="w-full flex flex-col gap-y-4">
            <h3 className="font-bold">상세 내용</h3>
            {/* TODO : 높이조절 필요 */}
            <InputAreaAtom
              placeholder="상세 내용을 입력해주세요."
              textCount={200}
            />
          </div>
          <PointPolicyInfoModule />
        </div>
        <div className="w-full flex items-center justify-end">
          <ButtonAtom
            buttonType="yellow"
            onClick={() => {
              setIsConfirmModalOpen(true);
            }}
          >
            등록하기
          </ButtonAtom>
        </div>
        {/* TODO : 머지 후 children에 이미지 넣어야 됨 */}
        {isConfirmModalOpen && (
          <ModalModule
            title="정책을 추가하시겠습니까?"
            content="정책 추가"
            onConfirm={() => {
              alert('등록하기');
              // TODO : API 연동
              router.push('/admin/points/policy');
            }}
            onCancel={() => {
              setIsConfirmModalOpen(false);
            }}
          />
        )}
      </section>
    </div>
  );
};

export default AdminPointsPolicyNewPage;
