'use client';

import PointPolicyInfoModule from '@/_components/admin/points/modules/PointPolicyInfoModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import InputAreaAtom from '@/_components/common/atoms/InputAreaAtom';
import InputModule from '@/_components/common/modules/InputModule';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

const data = {
  id: 1,
  type: '토이프로젝트',
  score: 100,
  content: '자기계발하면 줌',
  createdAt: '2024-07-20',
};

const AdminPointsPolicyEditPage = () => {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col gap-y-10 overflow-y-auto">
      <TitleBarModule title="포인트 정책 수정" type="LEFT" />
      <section className="w-full flex flex-col gap-y-[60px]">
        <div className="w-full flex flex-col gap-y-[30px]">
          <div className="w-full flex gap-x-[30px] items-center">
            <div className="flex-1">
              {/* TODO : InputModuel에 value 사용법 수정 필요 */}
              <InputModule subtitle="분류" value={data.type} />
            </div>
            <div className="flex-1">
              <InputModule
                subtitle="포인트"
                value={data.score.toLocaleString()}
              />
            </div>
          </div>
          <div className="w-full flex gap-x-[30px] items-center">
            <div className="flex-1">
              {/* TODO : ReadOnly 및 background 필요 */}
              <InputModule
                subtitle="등록일시"
                value={dayjs(data.createdAt).format('YYYY.MM.DD')}
              />
            </div>
            <div className="flex-1" />
          </div>
          <div className="w-full flex flex-col gap-y-4">
            <h3 className="font-bold">상세 내용</h3>
            {/* TODO : 높이조절 필요 */}
            <InputAreaAtom value={data.content} />
          </div>
          <PointPolicyInfoModule />
        </div>
        <div className="w-full flex items-center justify-end gap-x-5">
          <ButtonAtom
            buttonType="dark"
            onClick={() => {
              router.push(`/admin/points/policy/${data.id}`);
            }}
          >
            닫기
          </ButtonAtom>
          <ButtonAtom
            buttonType="yellow"
            onClick={() => {
              router.push(`/admin/points/policy/${data.id}/edit`);
            }}
          >
            수정
          </ButtonAtom>
        </div>
      </section>
    </div>
  );
};

export default AdminPointsPolicyEditPage;
