'use client';

import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import InputAreaAtom from '@/_components/common/atoms/InputAreaAtom';
import InputModule from '@/_components/common/modules/InputModule';
import ModalModule from '@/_components/common/modules/ModalModule';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import { useDeletePointPolicyMutation } from '@/_hooks/admin/useDeletePointPolicyMutation';
import { useGetPointPolicyDetailQuery } from '@/_hooks/admin/useGetPointPolicyDetailQuery';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { set, z } from 'zod';
import AdminLoading from '@/_components/admin/adminLoading';
import NetworkError from '@/_components/common/networkError';

interface AdminPointsPolicyDetailPageProps {
  params: {
    id: string;
  };
}

const AdminPointsPolicyDetailPage = ({
  params,
}: AdminPointsPolicyDetailPageProps) => {
  const { id } = params;
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { data, isLoading, isError } = useGetPointPolicyDetailQuery({
    id: Number(id),
  });
  const { mutate: tryDeletePointPolicy } = useDeletePointPolicyMutation({
    successCallback: () => {
      setIsDeleteModalOpen(false);
      router.push('/admin/points/policy');
    },
  });

  return (
    <div className="flex w-full flex-col gap-y-10 overflow-y-auto">
      <TitleBarModule title="포인트 정책 상세" type="LEFT" />
      <section className="flex w-full flex-col gap-y-[60px]">
        {!data ? (
          isLoading ? (
            <AdminLoading />
          ) : isError ? (
            <NetworkError />
          ) : null
        ) : (
          <div className="flex w-full flex-col gap-y-[30px]">
            <div className="flex w-full items-center gap-x-[30px]">
              <div className="flex-1">
                {/* TODO : InputModuel에 value 사용법 수정 필요 */}
                <InputModule
                  subtitle="분류"
                  value={data.policyTitle}
                  status="readonly"
                />
              </div>
              <div className="flex-1">
                <InputModule
                  subtitle="포인트"
                  value={data.quantity.toLocaleString()}
                  status="readonly"
                />
              </div>
            </div>
            <div className="flex w-full items-center gap-x-[30px]">
              <div className="flex-1">
                {/* TODO : ReadOnly 및 background 필요 */}
                <InputModule
                  subtitle="등록일시"
                  value={dayjs(data.lastModifiedAt).format('YYYY.MM.DD')}
                  status="disabled"
                />
              </div>
              <div className="flex-1" />
            </div>
            <div className="flex w-full flex-col gap-y-4">
              <h3 className="font-bold">상세 내용</h3>
              <TextAreaModule
                name="content"
                value={data.detail}
                placeholder="내용입니다."
                size="SMALL"
                readonly
              />
            </div>
          </div>
        )}
        <div className="flex w-full items-center justify-end gap-x-5">
          <ButtonAtom
            type="button"
            buttonStyle="red"
            onClick={() => {
              setIsDeleteModalOpen(true);
            }}
            text="삭제"
          />
          <ButtonAtom
            type="button"
            buttonStyle="dark"
            onClick={() => {
              router.replace(`/admin/points/policy/${id}/edit`);
            }}
            text="수정"
          />
        </div>
        {/* TODO : 머지 후 children 삽입 */}
        {isDeleteModalOpen && (
          <ModalModule
            title="정책을 삭제하시겠습니까?"
            confirmButtonStyle="red"
            confirmText="삭제"
            onConfirm={() => {
              tryDeletePointPolicy(id);
            }}
            onCancel={() => {
              setIsDeleteModalOpen(false);
            }}
          >
            <p>삭제 시 복구할 수 없습니다.</p>
          </ModalModule>
        )}
      </section>
    </div>
  );
};

export default AdminPointsPolicyDetailPage;
