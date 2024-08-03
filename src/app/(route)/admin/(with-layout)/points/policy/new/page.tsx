'use client';

import PointPolicyInfoModule from '@/_components/admin/points/modules/PointPolicyInfoModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import InputModule from '@/_components/common/modules/InputModule';
import ModalModule from '@/_components/common/modules/ModalModule';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import { usePostPointPolicyMutation } from '@/_hooks/admin/usePostPointPolicyMutation';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';

const AdminPointsPolicyNewPage = () => {
  const router = useRouter();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [form, setForm] = useState({
    policyTitle: '',
    detail: '',
    quantity: 0,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const { mutate: tryPostPolicy } = usePostPointPolicyMutation({
    successCallback: () => {
      router.push('/admin/points/policy');
    },
  });

  return (
    <div className="flex w-full flex-col gap-y-10 overflow-y-auto">
      <TitleBarModule title="포인트 정책 추가" type="LEFT" />
      <section className="flex w-full flex-col gap-y-[60px]">
        <div className="flex w-full flex-col gap-y-[30px]">
          <div className="flex w-full items-center gap-x-[30px]">
            <div className="flex-1">
              <InputModule
                name="policyTitle"
                subtitle="분류"
                placeholder="분류를 입력해주세요."
                textCount={20}
                value={form.policyTitle}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1">
              <InputModule
                name="quantity"
                subtitle="포인트"
                placeholder="지급할 포인트를 입력해주세요."
                value={form.quantity}
                onChange={handleChange}
                type="number"
              />
            </div>
          </div>
          <div className="flex w-full items-center gap-x-[30px]">
            <div className="flex-1">
              <InputModule
                subtitle="등록일시"
                value={dayjs().format('YYYY.MM.DD')}
                status="disabled"
              />
            </div>
            <div className="flex-1" />
          </div>
          <div className="flex w-full flex-col gap-y-4">
            <h3 className="font-bold">상세 내용</h3>
            {/* TODO : 높이조절 필요 */}
            <TextAreaModule
              name="detail"
              size="MEDIUM"
              placeholder="상세 내용을 입력해주세요."
              maxLength={100}
              value={form.detail}
              onChange={handleChange}
            />
          </div>
          <PointPolicyInfoModule />
        </div>
        <div className="flex w-full items-center justify-end">
          <ButtonAtom
            type="button"
            buttonStyle="yellow"
            onClick={() => {
              setIsConfirmModalOpen(true);
            }}
            text="추가하기"
          />
        </div>
        {/* TODO : 머지 후 children에 이미지 넣어야 됨 */}
        {isConfirmModalOpen && (
          <ModalModule
            title="정책을 추가하시겠습니까?"
            onConfirm={() => {
              tryPostPolicy({
                policyTitle: form.policyTitle,
                detail: form.detail,
                quantity: form.quantity,
              });
            }}
            onCancel={() => {
              setIsConfirmModalOpen(false);
            }}
          >
            <p className="text-5 text-sub-200">
              정책을 추가하시겠습니까? 추가 후에는 수정이 불가능합니다.
            </p>
          </ModalModule>
        )}
      </section>
    </div>
  );
};

export default AdminPointsPolicyNewPage;
