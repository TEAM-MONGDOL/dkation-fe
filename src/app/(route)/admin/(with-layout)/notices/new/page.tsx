'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import InputModule from '@/_components/common/modules/InputModule';
import FileContainer from '@/_components/common/containers/FileContainer';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import DropdownModule from '@/_components/common/modules/DropdownModule';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import { NoticeType, noticeTypeConverter } from '@/_types/adminType';
import { usePostNoticeMutation } from '@/_hooks/admin/usePostNoticeMutation';
import FileModule from '@/_components/common/modules/FileModule';
import ModalModule from '@/_components/common/modules/ModalModule';

const WriteNoticesPage = () => {
  const router = useRouter();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [values, setValues] = useState({
    announcementType: '' as NoticeType | '',
    title: '',
    fileInfos: [] as { url: string; fileName: string }[],
    description: '',
  });

  const { mutate: postAnnouncement } = usePostNoticeMutation({
    successCallback: () => {
      alert('게시글이 등록되었습니다.');
      setIsPostModalOpen(false);
      router.replace('/admin/notices');
    },
    errorCallback: (error: Error) => {
      console.error('failed upload announcement : ', error);
    },
  });

  const handleSelect = (option: string) => {
    const selectedKey = Object.keys(noticeTypeConverter).find(
      (key) => noticeTypeConverter[key as NoticeType] === option,
    ) as NoticeType;
    setValues({ ...values, announcementType: selectedKey });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilesChange = (
    fileInfos: { url: string; fileName: string }[],
  ) => {
    setValues((prevValues) => ({
      ...prevValues,
      fileInfos: [...prevValues.fileInfos, ...fileInfos],
    }));
  };

  const handleDeleteFile = (index: number) => {
    setValues((prevValues) => {
      const updatedFileInfos = prevValues.fileInfos.filter(
        (_, idx) => idx !== index,
      );
      return {
        ...prevValues,
        fileInfos: updatedFileInfos,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!values.announcementType) {
      alert('구분을 선택해 주세요.');
      return;
    }

    if (!values.title) {
      alert('제목을 입력해 주세요.');
      return;
    }

    setIsPostModalOpen(true);
  };

  const confirmPost = () => {
    const fileUrls = values.fileInfos.map((info) => info.url);
    const payload = { ...values, fileUrls };
    postAnnouncement(payload);
  };

  const getFileType = (url: string) => {
    const parts = url.split('.');
    const extension = parts.length > 1 ? parts.pop()?.toLowerCase() : '';
    const imageExtensions = ['jpg', 'jpeg', 'png'];
    return imageExtensions.includes(extension || '') ? 'image' : 'other';
  };

  return (
    <section>
      <TitleBarModule title="공지 글쓰기" type="LEFT" />
      <form onSubmit={handleSubmit}>
        <div className="pt-10">
          <p className="mb-4 text-3 font-bold">제목</p>
          <div className="flex w-full gap-4">
            <DropdownModule
              size="large"
              options={Object.values(noticeTypeConverter)}
              onSelect={handleSelect}
              placeholder="구분 선택"
              selectedOption={
                noticeTypeConverter[values.announcementType as NoticeType]
              }
            />
            <InputModule
              name="title"
              placeholder="제목을 입력하세요."
              textCount={30}
              value={values.title}
              onChange={handleChange}
            />
          </div>
          <div className="py-7">
            {values.fileInfos.length > 0 && (
              <div className="py-2">
                <div className="flex flex-col gap-2">
                  {values.fileInfos.map((fileInfo, index) => {
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
              fileDomainType="ANNOUNCEMENT"
              maxFileCount={5}
              maxFileSizeMB={10}
              existingFiles={values.fileInfos}
            />
          </div>
          <p className="mb-4 text-3 font-bold">내용</p>
          <TextAreaModule
            name="description"
            placeholder="상세 내용을 입력하세요."
            size="LARGE"
            maxLength={2000}
            value={values.description}
            onChange={handleChange}
          />
          <div className="flex justify-end pt-14">
            <ButtonAtom buttonStyle="yellow" text="등록" type="submit" />
          </div>
        </div>
      </form>
      {isPostModalOpen && (
        <ModalModule
          title={`해당 ${noticeTypeConverter[values.announcementType as NoticeType] || '게시글'}를 등록하시겠습니까?`}
          cancelText="취소"
          confirmText="확인"
          onCancel={() => setIsPostModalOpen(false)}
          onConfirm={confirmPost}
        />
      )}
    </section>
  );
};

export default WriteNoticesPage;
