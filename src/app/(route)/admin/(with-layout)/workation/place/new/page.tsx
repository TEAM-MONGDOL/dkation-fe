'use client';

import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import InputModule from '@/_components/common/modules/InputModule';
import FileContainer from '@/_components/common/containers/FileContainer';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import React, { useState } from 'react';
import ModalModule from '@/_components/common/modules/ModalModule';
import InfoSectionContainer from '@/_components/common/containers/InfoSectionContainer';
import { useRouter } from 'next/navigation';
import { useWkNewPlaceMutation } from '@/_hooks/admin/useWkPlaceNewMutate';
import dayjs from 'dayjs';

const AdminWorkationPlaceNewPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    placeName: '',
    address: '',
    maxPeople: 0,
    description: '',
  });
  const successCallback = () => {
    alert('워케이션 장소 등록 완료');
    router.replace('/admin/workation/place');
  };

  const { mutate: postWkPlace } = useWkNewPlaceMutation(successCallback);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [isConfirmModelOpen, setIsConfirmModelOpen] = useState(false);
  const handleSubmit = () => {
    postWkPlace({
      place: formData.placeName,
      thumbnailUrls: ['dd'],
      maxPeople: formData.maxPeople,
      address: formData.address,
      description: formData.description,
    });
    setIsConfirmModelOpen(false);
  };
  return (
    <section className="flex flex-col gap-7">
      <TitleBarModule title="장소 추가" type="LEFT" />
      <div className="flex w-full gap-7">
        <InputModule
          subtitle="이름"
          textCount={20}
          placeholder="장소 이름을 입력하세요."
          value={formData.placeName}
          onChange={handleChange}
          name="placeName"
        />
        <InputModule
          subtitle="주소"
          placeholder="주소를 입력하세요."
          value={formData.address}
          onChange={handleChange}
          name="address"
        />
      </div>
      <div className="flex w-full gap-7">
        <InputModule
          subtitle="최대 인원"
          placeholder="0"
          value={formData.maxPeople}
          onChange={handleChange}
          name="maxPeople"
        />
        <InputModule
          subtitle="등록 일시"
          status="disabled"
          value={dayjs().format('YYYY.MM.DD')}
        />
      </div>
      <FileContainer />
      <div>
        <p className="mb-4 text-3 font-bold">상세 내용</p>
        <TextAreaModule
          placeholder="상세 내용을 입력하세요"
          size="MEDIUM"
          maxLength={500}
          name="상세내용"
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-end gap-5">
        <ButtonAtom
          text="취소"
          type="button"
          width="fixed"
          buttonStyle="dark"
        />
        <ButtonAtom
          text="등록"
          type="button"
          width="fixed"
          buttonStyle="yellow"
          onClick={() => setIsConfirmModelOpen(true)}
        />
      </div>
      {isConfirmModelOpen && (
        <ModalModule
          title="장소를 추가하시겠습니까?"
          confirmText="확인"
          cancelText="취소"
          confirmButtonStyle="dark"
          cancelButtonStyle="yellow"
          onConfirm={() => {
            //  TODO : 워케이션 장소 등록 API 호출
            alert('워케이션 장소 등록 완료');
            setIsConfirmModelOpen(false);
            router.push('/admin/workation/place');
          }}
          onCancel={() => {
            setIsConfirmModelOpen(false);
          }}
        >
          <InfoSectionContainer
            data={[
              {
                subtitle: '제목',
                content: formData.placeName,
              },
              {
                subtitle: '장소',
                content: formData.address,
              },
              {
                subtitle: '최대인원',
                content: formData.maxPeople.toString(),
              },
            ]}
          />
        </ModalModule>
      )}
    </section>
  );
};

export default AdminWorkationPlaceNewPage;
