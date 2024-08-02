'use client';

import InputModule from '@/_components/common/modules/InputModule';
import React, { ReactNode, useState } from 'react';
import placeImsy from '@/_assets/images/place_impy.png';
import dayjs from 'dayjs';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ModalModule from '@/_components/common/modules/ModalModule';
import logo from '@/_assets/images/logo_imsy.png';

const workationExample = {
  id: 1,
  title: '제목입니다',
  number: '2',
  place: '양양',
  description: '상세내용입니다.',
};

const WorkationDetail = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };
  const router = useRouter();
  return (
    <section className="flex flex-col">
      <TitleBarModule title="워케이션 상세" type="LEFT" />
      <div className="mt-10 flex flex-col gap-[30px]">
        <div className="flex h-52 gap-x-8">
          <Image src={placeImsy} alt="placeImsy" />
          <div className="w-full">
            <div className="flex w-full gap-6">
              <div className="w-full">
                <InputModule
                  subtitle="제목"
                  value={workationExample.title}
                  name="title"
                  status="readonly"
                />
              </div>
              <div className="w-52">
                <InputModule
                  subtitle="모집 인원"
                  value={workationExample.number}
                  name="number"
                  status="readonly"
                />
              </div>
            </div>
            <div className="mt-6 flex w-full flex-col gap-4">
              <InputModule
                subtitle="장소"
                value={workationExample.place}
                name="place"
                status="readonly"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex w-full flex-col gap-4">
            <p className="text-3 font-semibold">모집 기간</p>
            <div className="flex items-center gap-4">
              <InputModule value="2024.06.07" name="place" status="readonly" />
              <p className="text-sub-200">-</p>
              <InputModule value="2024.06.07" name="place" status="readonly" />
            </div>
          </div>
          <div className="flex w-full flex-col gap-4">
            <p className="text-3 font-semibold">워케이션 기간</p>
            <div className="flex items-center gap-4">
              <InputModule value="2024.06.07" name="place" status="readonly" />
              <p className="text-sub-200">-</p>
              <InputModule value="2024.06.07" name="place" status="readonly" />
            </div>
          </div>
        </div>
        <div className="-mt-4">
          <p className="mb-3 text-3 font-semibold">내용</p>
          <TextAreaModule
            readonly
            size="LARGE"
            value={workationExample.description}
            name="워케이션 상세내용"
          />
        </div>
      </div>
      <div className="mt-12 flex justify-end gap-5">
        <ButtonAtom
          width="fixed"
          text="삭제"
          type="button"
          buttonStyle="red"
          onClick={() => setIsDeleteModalOpen(true)}
        />
        <ButtonAtom
          width="fixed"
          text="수정"
          type="button"
          buttonStyle="dark"
          onClick={() =>
            router.push(`/admin/workation/${workationExample.id}/edit`)
          }
        />
      </div>
      {isDeleteModalOpen && (
        <ModalModule
          title="해당 게시글을 삭제하시겠습니까?"
          cancelText="취소"
          confirmText="삭제"
          confirmButtonStyle="red"
          onCancel={() => {
            setIsDeleteModalOpen(false);
          }}
          onConfirm={() => {
            setIsDeleteModalOpen(false);
            router.push('/admin/workation');
          }}
        >
          <div className="flex justify-center">
            <Image className="h-5 w-24" src={logo} alt="logo" />
          </div>
        </ModalModule>
      )}
    </section>
  );
};

export default WorkationDetail;
