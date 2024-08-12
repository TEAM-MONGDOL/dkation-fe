'use client';

import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import InputModule from '@/_components/common/modules/InputModule';
import FileContainer from '@/_components/common/containers/FileContainer';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import React, { useEffect, useState } from 'react';
import ModalModule from '@/_components/common/modules/ModalModule';
import InfoSectionContainer from '@/_components/common/containers/InfoSectionContainer';
import { useRouter } from 'next/navigation';
import { useWkNewPlaceMutation } from '@/_hooks/admin/useWkPlaceNewMutate';
import dayjs from 'dayjs';
import FileModule from '@/_components/common/modules/FileModule';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';
import { useGetKakaoAdddress } from '@/_hooks/admin/useGetKakaoAddress';
import KakaoMapContainer from '@/_components/common/containers/KakaoMapContainer';

const AdminWorkationPlaceNewPage = () => {
  const router = useRouter();
  const [originAddress, setOriginAddress] = useState('');
  const [formData, setFormData] = useState({
    placeName: '',
    address: '',
    fileInfos: [] as { url: string; fileName: string }[],
    maxPeople: 0,
    description: '',
  });
  const open = useDaumPostcodePopup(
    '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
  );
  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    setOriginAddress(data.address);

    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setFormData((prevData) => ({
      ...prevData,
      address: fullAddress,
    }));
  };

  const { data: kakaoAddress } = useGetKakaoAdddress({
    address: originAddress,
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

  const handleAddressClick = () => {
    open({
      onComplete: handleComplete,
    });
  };

  const handleSubmit = () => {
    postWkPlace({
      place: formData.placeName,
      thumbnailUrls: formData.fileInfos.map((fileInfo) => fileInfo.url),
      maxPeople: formData.maxPeople,
      address: formData.address,
      description: formData.description,
      latitude: kakaoAddress?.documents[0].y || '',
      longitude: kakaoAddress?.documents[0].x || '',
    });
    setIsConfirmModelOpen(false);
  };

  const handleFilesChange = (
    fileInfos: { url: string; fileName: string }[],
  ) => {
    setFormData((prevValues) => ({
      ...prevValues,
      fileInfos: [...prevValues.fileInfos, ...fileInfos],
    }));
  };
  const handleDeleteFile = (index: number) => {
    setFormData((prevValues) => {
      const updatedFileInfos = prevValues.fileInfos.filter(
        (_, idx) => idx !== index,
      );
      return {
        ...prevValues,
        fileInfos: updatedFileInfos,
      };
    });
  };
  const getFileType = (url: string) => {
    const parts = url.split('.');
    const extension = parts.length > 1 ? parts.pop()?.toLowerCase() : '';
    const imageExtensions = ['jpg', 'jpeg', 'png'];
    return imageExtensions.includes(extension || '') ? 'image' : 'other';
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
          status="cursor"
          name="address"
          onClick={() => handleAddressClick()}
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
      {kakaoAddress && (
        <KakaoMapContainer
          latitude={kakaoAddress.documents[0].y}
          longitude={kakaoAddress.documents[0].x}
        />
      )}
      <div className="py-7">
        {formData.fileInfos.length > 0 && (
          <div className="py-2">
            <div className="flex flex-col gap-2">
              {formData.fileInfos.map((fileInfo, index) => {
                const fileType = getFileType(fileInfo.url);
                return (
                  <div
                    key={fileInfo.fileName}
                    className="flex items-center gap-2"
                  >
                    <FileModule
                      preview={fileInfo.url}
                      fileName={fileInfo.fileName}
                      fileType={fileType}
                      buttonType="delete"
                      onDelete={() => handleDeleteFile(index)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <FileContainer
          onFileChange={handleFilesChange}
          fileDomainType="WKT_PLACE"
        />
      </div>
      <div>
        <p className="mb-4 text-3 font-bold">상세 내용</p>
        <TextAreaModule
          placeholder="상세 내용을 입력하세요"
          size="MEDIUM"
          maxLength={500}
          name="description"
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-end gap-5">
        <ButtonAtom
          text="취소"
          type="button"
          width="fixed"
          buttonStyle="dark"
          onClick={() => router.back()}
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
            handleSubmit();
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
