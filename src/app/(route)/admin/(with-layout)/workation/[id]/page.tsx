'use client';

import InputModule from '@/_components/common/modules/InputModule';
import React, { useState } from 'react';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ModalModule from '@/_components/common/modules/ModalModule';
import logo from '@/_assets/images/logo_imsy.png';
import { useGetWkDetailQuery } from '@/_hooks/admin/useGetWkDetailQuery';
import { useGetWkPlaceListQuery } from '@/_hooks/admin/useGetWkPlaceListQuery';
import { useDeleteWkMutation } from '@/_hooks/admin/useDeleteWkQuery';

interface WkDetailProps {
  params: { id: number };
}
const WorkationDetail = ({ params }: WkDetailProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { id } = params;
  const { data, isLoading, isError } = useGetWkDetailQuery({
    wktId: id,
  });

  const {
    data: placeData,
    isLoading: isPlaceLoading,
    isError: isPlaceError,
  } = useGetWkPlaceListQuery({
    pageParam: {
      page: 1,
      size: 100,
    },
  });
  const router = useRouter();
  const { mutate: deleteWkMutation } = useDeleteWkMutation(id);

  if (isLoading || isPlaceLoading) {
    return <div>Loading...</div>; // 로딩컴포넌트 추가시 변경예정
  }
  if (isError || isPlaceError) {
    return <div>Error loading data</div>; // 에러컴포넌트 추가시 변경예정
  }
  if (!data || !placeData) {
    return <div>No data</div>;
  }
  const placeInfo = placeData.wktPlaceInfos.find(
    (place) => place.id === data.wktPlaceId,
  );

  return (
    <section className="flex flex-col">
      <TitleBarModule title="워케이션 상세" type="LEFT" />
      <div className="mt-10 flex flex-col gap-[30px]">
        <div className="flex h-52 gap-x-8">
          {placeInfo ? (
            <Image
              width={400}
              height={300}
              src={placeInfo.thumbnailUrl}
              alt={placeInfo.place}
            />
          ) : (
            <Image src="/fallback-image.png" alt="No place image available" />
          )}
          <div className="w-full">
            <div className="flex w-full gap-6">
              <div className="w-full">
                <InputModule
                  subtitle="제목"
                  value={data.title}
                  name="title"
                  status="readonly"
                />
              </div>
              <div className="w-52">
                <InputModule
                  subtitle="모집 인원"
                  value={data.totalRecruit}
                  name="number"
                  status="readonly"
                />
              </div>
            </div>
            <div className="mt-6 flex w-full flex-col gap-4">
              <InputModule
                subtitle="장소"
                value={placeInfo ? placeInfo.place : 'Unknown place'}
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
              <InputModule
                value={data.applyStartDate}
                name="place"
                status="readonly"
              />
              <p className="text-sub-200">-</p>
              <InputModule
                value={data.applyEndDate}
                name="place"
                status="readonly"
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-4">
            <p className="text-3 font-semibold">워케이션 기간</p>
            <div className="flex items-center gap-4">
              <InputModule
                value={data.startDate}
                name="place"
                status="readonly"
              />
              <p className="text-sub-200">-</p>
              <InputModule
                value={data.endDate}
                name="place"
                status="readonly"
              />
            </div>
          </div>
        </div>
        <div className="-mt-4">
          <p className="mb-3 text-3 font-semibold">내용</p>
          <TextAreaModule
            readonly
            size="LARGE"
            value={data.description}
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
          onClick={() => router.push(`/admin/workation/${id}/edit`)}
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
            deleteWkMutation();
            setIsDeleteModalOpen(false);
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
