'use client';

import { InfoIcon } from '@/_assets/icons';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import InputAreaAtom from '@/_components/common/atoms/InputAreaAtom';
import InfoSectionContainer from '@/_components/common/containers/InfoSectionContainer';
import InputModule from '@/_components/common/modules/InputModule';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const AdminPointsPolicyNewPage = () => {
  const router = useRouter();

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
          <div className="w-full flex gap-x-12 rounded-regular items-start bg-cus-100 p-5">
            <div className="flex items-center gap-x-3">
              <Image src={InfoIcon} alt="Info Icon" width={24} height={24} />
              <span className="font-semibold text-sub-300">주의사항</span>
            </div>
            <ul className="text-sub-200 list-disc list-inside">
              <li>
                포인트 정책 등록 시 이는 등록 일자 이후의 모든 포인트 심사 및
                등록에 적용됩니다.
              </li>
              <li>
                새로운 정책에 대해 모든 회원에게 메일을 통해 안내 되며, 회원은
                이러한 정책에 알맞은 포인트 신청을 진행할 수 있습니다.
              </li>
              <li>
                기존 정책 수정 시에도 회원들에게 메일을 통해 안내됩니다. 잦은
                수정은 지양해주시길 바랍니다.
              </li>
              <li>{`단발성 이벤트로 인한 포인트 지급은 정책 등록이 아닌 공지 > 이벤트 등록과 단체 포인트 지급하기 기능을 이용해주세요.`}</li>
            </ul>
          </div>
        </div>
        <div className="w-full flex items-center justify-end">
          <ButtonAtom
            buttonType="yellow"
            onClick={() => {
              alert('등록하기');
              // TODO : API 연동
              router.push('/admin/points/policy');
            }}
          >
            등록하기
          </ButtonAtom>
        </div>
      </section>
    </div>
  );
};

export default AdminPointsPolicyNewPage;
