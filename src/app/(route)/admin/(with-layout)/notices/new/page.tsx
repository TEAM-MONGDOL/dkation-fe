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

const WriteNoticesPage = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    announcementType: '' as NoticeType | '',
    title: '',
    fileInfos: [] as { url: string; fileName: string }[],
    description: '',
  });

  const { mutate: postAnnouncement } = usePostNoticeMutation({
    successCallback: () => {
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
              placeholder={
                values.announcementType === 'RESULT'
                  ? '해당 게시글의 제목이 메인 페이지 배너에 노출됩니다.'
                  : '제목을 입력하세요.'
              }
              textCount={20}
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
    </section>
  );
};

export default WriteNoticesPage;
