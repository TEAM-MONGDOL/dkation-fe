'use client';

import PointPolicyInfoModule from '@/_components/admin/points/modules/PointPolicyInfoModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import InputModule from '@/_components/common/modules/InputModule';
import ModalModule from '@/_components/common/modules/ModalModule';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import { useGetPointPolicyDetailQuery } from '@/_hooks/admin/useGetPointPolicyDetailQuery';
import { usePatchPointPolicyMutation } from '@/_hooks/admin/usePatchPointPolicyMutation';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AdminPointsPolicyEditPageProps {
  params: {
    id: string;
  };
}

const AdminPointsPolicyEditPage = ({
  params,
}: AdminPointsPolicyEditPageProps) => {
  const { id } = params;
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { data: policyDetail } = useGetPointPolicyDetailQuery({
    id: Number(id),
  });
  const { mutate: tryPatchPointPolicy } = usePatchPointPolicyMutation({
    policyId: Number(id),
    successCallback: () => {
      alert('수정되었습니다.');
      router.replace(`/admin/points/policy/${id}`);
    },
    errorCallback: (error: Error) => {
      alert('수정에 실패했습니다.');
    },
  });
  const [form, setForm] = useState<{
    type: string;
    score: number;
    content: string;
  }>({
    type: policyDetail?.policyTitle || '',
    score: policyDetail?.quantity || 0,
    content: policyDetail?.detail || '',
  });

  useEffect(() => {
    if (policyDetail) {
      setForm({
        type: policyDetail.policyTitle,
        score: policyDetail.quantity,
        content: policyDetail.detail,
      });
    }
  }, [policyDetail]);

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div className="flex w-full flex-col gap-y-10 overflow-y-auto">
      <TitleBarModule title="포인트 정책 수정" type="LEFT" />
      <section className="flex w-full flex-col">
        <form className="flex w-full flex-col gap-y-6xl">
          <div className="flex w-full flex-col gap-y-[30px]">
            <div className="flex w-full items-center gap-x-[30px]">
              <div className="flex-1">
                {/* TODO : InputModuel에 value 사용법 수정 필요 */}
                <InputModule
                  name="type"
                  subtitle="분류"
                  value={form.type}
                  onChange={onChange}
                />
              </div>
              <div className="flex-1">
                <InputModule
                  name="score"
                  subtitle="포인트"
                  value={form.score.toLocaleString()}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="flex w-full items-center gap-x-[30px]">
              <div className="flex-1">
                {/* TODO : ReadOnly 및 background 필요 */}
                <InputModule
                  name="createdAt"
                  subtitle="등록일시"
                  value={dayjs(policyDetail?.lastModifiedAt).format(
                    'YYYY.MM.DD',
                  )}
                  status="disabled"
                  onChange={onChange}
                />
              </div>
              <div className="flex-1" />
            </div>
            <div className="flex w-full flex-col gap-y-4">
              <h3 className="font-bold">상세 내용</h3>
              {/* TODO : 높이조절 필요 */}
              <TextAreaModule
                name="content"
                value={form.content}
                onChange={onChange}
                size="SMALL"
                placeholder="내용을 입력하세요."
                maxLength={200}
              />
            </div>
            <PointPolicyInfoModule />
          </div>
          <div className="flex w-full items-center justify-end gap-x-5">
            <ButtonAtom
              type="button"
              buttonStyle="dark"
              onClick={() => {
                router.replace(`/admin/points/policy/${id}`);
              }}
              text="닫기"
            />
            <ButtonAtom
              type="button"
              buttonStyle="yellow"
              onClick={() => {
                setIsEditModalOpen(true);
              }}
              text="수정"
            />
          </div>
          {/* TODO : 머지 후 children 삽입 필요 */}
          {isEditModalOpen && (
            <ModalModule
              title="정책을 수정하시겠습니까?"
              confirmText="수정"
              onConfirm={() => {
                tryPatchPointPolicy({
                  policyTitle: form.type,
                  detail: form.content,
                  quantity: form.score,
                });
              }}
              onCancel={() => {
                setIsEditModalOpen(false);
              }}
            >
              <div className="flex w-full flex-col items-center gap-y-4">
                <p className="text-center">정책을 수정하시겠습니까?</p>
              </div>
            </ModalModule>
          )}
        </form>
      </section>
    </div>
  );
};

export default AdminPointsPolicyEditPage;
