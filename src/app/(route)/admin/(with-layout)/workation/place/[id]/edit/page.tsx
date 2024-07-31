'use client';

import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import InputModule from '@/_components/common/modules/InputModule';
import FileContainer from '@/_components/common/containers/FileContainer';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FileModule from '@/_components/common/modules/FileModule';
import ModalModule from '@/_components/common/modules/ModalModule';
import InfoSectionContainer from '@/_components/common/containers/InfoSectionContainer';
import dayjs from 'dayjs';

interface FileItem {
  name: string;
  url: string;
  type: 'image' | 'other';
}

const data = {
  placeName: '양양',
  address: '강원도 양양군 손양면 도화길 14',
  maxPeople: '2',
  registrationDate: '2024.07.14',
  description: '상세내용입니다.',
  files: [
    {
      name: '첨부파일1.pdf',
      url: '/file/path/example/file1.pdf',
      type: 'other',
    },
    {
      name: '첨부파일2.pdf',
      url: '/file/path/example/file2.pdf',
      type: 'other',
    },
  ] as FileItem[],
};
const AdminWorkationPlaceEditPage = () => {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [values, setValues] = useState({
    placeName: data.placeName,
    address: data.address,
    maxPeople: data.maxPeople,
    registrationDate: data.registrationDate,
    files: data.files,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleFilesChange = (newFiles: File[]) => {
    const fileItems: FileItem[] = newFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image') ? 'image' : 'other',
    }));

    setValues({
      ...values,
      files: fileItems,
    });
  };

  return (
    <section className="flex flex-col gap-7">
      <TitleBarModule title="장소 수정" type="LEFT" />
      <div className="flex w-full gap-7">
        <InputModule
          subtitle="이름"
          textCount={20}
          placeholder="장소 이름을 입력하세요."
          value={values.placeName}
          onChange={handleChange}
          name="placeName"
        />
        <InputModule
          subtitle="주소"
          placeholder="주소를 입력하세요."
          value={values.address}
          onChange={handleChange}
          name="address"
        />
      </div>
      <div className="flex w-full gap-7">
        <InputModule
          subtitle="최대 인원"
          placeholder="0"
          value={values.maxPeople}
          onChange={handleChange}
          name="maxPeople"
        />
        <InputModule
          subtitle="등록 일시"
          status="disabled"
          value={values.registrationDate}
          onChange={() => {}}
        />
      </div>
      <div className="flex flex-col gap-4 py-7">
        {values.files.length > 0 ? (
          <div className="flex flex-col gap-2">
            {values.files.map((file) => (
              <FileModule
                key={file.url}
                fileName={file.name}
                fileType={file.type}
                fileUrl={file.url}
                buttonType="delete"
                onDelete={() => console.log(`Delete ${file.name}`)} // 추후 수정 예정
              />
            ))}
          </div>
        ) : (
          ''
        )}
        <FileContainer onFileChange={handleFilesChange} /> <div />
        <p className="mb-4 text-3 font-bold">상세 내용</p>
        <TextAreaModule
          placeholder="상세 내용을 입력하세요"
          size="MEDIUM"
          maxLength={500}
          name="상세내용"
          value={data.description}
        />
      </div>
      <div className="mt-12 flex justify-end gap-5">
        <ButtonAtom
          width="fixed"
          text="취소"
          type="button"
          buttonStyle="dark"
          onClick={() => router.push('/admin/workation/place')}
        />
        <ButtonAtom
          width="fixed"
          text="수정"
          type="button"
          buttonStyle="yellow"
          onClick={() => setIsEditModalOpen(true)}
        />
      </div>
      {isEditModalOpen && (
        <ModalModule
          title="워케이션 장소를 수정하시겠습니까?"
          confirmText="확인"
          cancelText="취소"
          onConfirm={() => {
            //  TODO : 워케이션 장소 수정 API 호출
            alert('워케이션 장소 수정 완료');
            setIsEditModalOpen(false);
            router.push('/admin/workation/place');
          }}
          onCancel={() => {
            setIsEditModalOpen(false);
          }}
        >
          <InfoSectionContainer
            data={[
              {
                subtitle: '이름',
                content: values.placeName,
              },
              {
                subtitle: '주소',
                content: values.address,
              },
              {
                subtitle: '최대 인원',
                content: values.maxPeople,
              },
            ]}
          />
        </ModalModule>
      )}
    </section>
  );
};

export default AdminWorkationPlaceEditPage;
