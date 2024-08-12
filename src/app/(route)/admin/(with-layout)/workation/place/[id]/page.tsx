'use client';

import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import InputModule from '@/_components/common/modules/InputModule';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import { useRouter } from 'next/navigation';
import FileModule from '@/_components/common/modules/FileModule';
import { useGetWkPlaceDetailQuery } from '@/_hooks/admin/useGetWkPlaceDetailQuery';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import ModalModule from '@/_components/common/modules/ModalModule';
import Image from 'next/image';
import logo from '@/_assets/images/logo_imsy.png';
import { useDeleteWkPlaceMutation } from '@/_hooks/admin/useDeleteWkPlaceQuery';
import KakaoMapContainer from '@/_components/common/containers/KakaoMapContainer';

interface WkPlaceDetailProps {
  params: { id: number };
}
const getFileType = (url: string | undefined) => {
  if (!url) return 'other';
  const extension = url.split('.').pop()?.toLowerCase();
  const imageExtensions = ['jpg', 'jpeg', 'png'];
  return extension && imageExtensions.includes(extension) ? 'image' : 'other';
};

const AdminWorkationPlaceDetailPage = ({ params }: WkPlaceDetailProps) => {
  const { id } = params;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { data, isLoading, isError } = useGetWkPlaceDetailQuery({
    wktPlaceId: id,
  });

  const router = useRouter();
  const { mutate: deleteWkPlaceMutation } = useDeleteWkPlaceMutation(id);

  if (isLoading) {
    return <div>Loading...</div>; // 로딩컴포넌트 추가시 변경예정
  }
  if (isError) {
    return <div>Error loading data</div>; // 에러컴포넌트 추가시 변경예정
  }
  if (!data) {
    return <div>No data</div>;
  }
  return (
    <section className="flex flex-col gap-7">
      <TitleBarModule title="장소 추가" type="LEFT" />
      <div className="flex w-full gap-7">
        <InputModule
          subtitle="이름"
          value={data.wktPlaceDetailInfo.place}
          name="placeName"
          status="readonly"
        />
        <InputModule
          subtitle="주소"
          value={data.wktPlaceDetailInfo.address}
          name="address"
          status="readonly"
        />
      </div>
      <div className="flex w-full gap-7">
        <InputModule
          subtitle="최대 인원"
          value={data.wktPlaceDetailInfo.maxPeople}
          name="maxPeople"
          status="readonly"
        />
        <InputModule
          subtitle="등록 일시"
          status="disabled"
          value={dayjs(data.wktPlaceDetailInfo.createdAt).format('YYYY-MM-DD')}
        />
      </div>
      {data.wktPlaceDetailInfo.longitude &&
        data.wktPlaceDetailInfo.latitude && (
          <KakaoMapContainer
            latitude={data.wktPlaceDetailInfo.latitude}
            longitude={data.wktPlaceDetailInfo.longitude}
          />
        )}
      <div className="py-4">
        {data.wktPlaceDetailInfo.fileInfos &&
        data.wktPlaceDetailInfo.fileInfos.length > 0 ? (
          <div className="py-2">
            <div className="flex flex-col gap-2">
              {data.wktPlaceDetailInfo.fileInfos.map((file, index) => {
                const fileType = getFileType(file.url);
                return (
                  <div key={file.url} className="flex items-center gap-2">
                    <FileModule
                      preview={file.url}
                      fileName={file.fileName}
                      fileType={fileType}
                      buttonType="download"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
      <div>
        <p className="mb-4 text-3 font-bold">상세 내용</p>
        <TextAreaModule
          readonly
          placeholder="내용이 존재하지 않습니다."
          size="MEDIUM"
          name="description"
          value={data.wktPlaceDetailInfo.description}
        />
      </div>
      <div className="flex justify-end gap-5">
        <ButtonAtom
          width="fixed"
          text="삭제"
          type="button"
          buttonStyle="red"
          onClick={() => setIsDeleteModalOpen(true)}
        />
        <ButtonAtom
          text="수정"
          type="button"
          width="fixed"
          buttonStyle="dark"
          onClick={() => router.push(`/admin/workation/place/${id}/edit`)}
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
            deleteWkPlaceMutation();
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

export default AdminWorkationPlaceDetailPage;
