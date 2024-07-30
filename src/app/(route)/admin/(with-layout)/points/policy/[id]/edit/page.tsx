'use client';

import PointPolicyInfoModule from '@/_components/admin/points/modules/PointPolicyInfoModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import InputAreaAtom from '@/_components/common/atoms/InputAreaAtom';
import InputModule from '@/_components/common/modules/InputModule';
import ModalModule from '@/_components/common/modules/ModalModule';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const data = {
  id: 1,
  type: '토이프로젝트',
  score: 100,
  content: '자기계발하면 줌',
  createdAt: '2024-07-20',
};

const AdminPointsPolicyEditPage = () => {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [form, setForm] = useState<{
    type: string;
    score: number;
    content: string;
  }>({
    type: data.type,
    score: data.score,
    content: data.content,
  });

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
                  value={dayjs(data.createdAt).format('YYYY.MM.DD')}
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
                router.push(`/admin/points/policy/${data.id}`);
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
                alert('수정하기');
                // TODO : API 연동
                router.push(`/admin/points/policy/${data.id}`);
              }}
              onCancel={() => {
                setIsEditModalOpen(false);
              }}
            />
          )}
        </form>
      </section>
    </div>
  );
};

export default AdminPointsPolicyEditPage;
