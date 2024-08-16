'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import InputModule from '@/_components/common/modules/InputModule';
import FileContainer from '@/_components/common/containers/FileContainer';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import DropdownModule from '@/_components/common/modules/DropdownModule';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import { NoticeType, noticeTypeConverter } from '@/_types/adminType';
import FileModule from '@/_components/common/modules/FileModule';
import ModalModule from '@/_components/common/modules/ModalModule';
import Image from 'next/image';
import logo from '@/_assets/images/logo_imsy.png';
import { useGetNoticeDetailQuery } from '@/_hooks/admin/useGetNoticeDetailQuery';
import { usePatchNoticeMutation } from '@/_hooks/admin/usePatchNoticeMutation';
import AdminLoading from '@/_components/admin/adminLoading';
import NetworkError from '@/_components/common/networkError';

interface NoticeEditPageProps {
  params: {
    id: number;
  };
}

interface FileInfo {
  url: string;
  fileName: string;
}

const getFileType = (url: string) => {
  const parts = url.split('.');
  const extension = parts.length > 1 ? parts.pop()?.toLowerCase() : '';
  const imageExtensions = ['jpg', 'jpeg', 'png'];
  return imageExtensions.includes(extension || '') ? 'image' : 'other';
};

const AdminWriteNoticesEditPage = ({ params }: NoticeEditPageProps) => {
  const { id } = params;
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data, isLoading, isError } = useGetNoticeDetailQuery({
    announcementId: id,
  });

  const [values, setValues] = useState({
    announcementType: data?.announcementDetailInfo.announcementType || '',
    title: data?.announcementDetailInfo.title || '',
    fileInfos: data?.announcementDetailInfo.fileInfos || [],
    description: data?.announcementDetailInfo.description || '',
  });

  useEffect(() => {
    if (data) {
      setValues({
        announcementType: data.announcementDetailInfo.announcementType,
        title: data.announcementDetailInfo.title,
        fileInfos: data.announcementDetailInfo.fileInfos || [],
        description: data.announcementDetailInfo.description,
      });
    }
  }, [data]);

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

  const handleFilesChange = (fileInfos: FileInfo[]) => {
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

  const { mutate: PatchNotice } = usePatchNoticeMutation({
    announcementId: id,
    successCallback: () => {
      alert('게시글이 수정되었습니다.');
      setIsEditModalOpen(false);
      router.replace(`/admin/notices`);
    },
  });

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

    setIsEditModalOpen(true);
  };

  const confirmEdit = () => {
    PatchNotice({
      title: values.title || '',
      description: values.description || '',
      announcementType: values.announcementType as
        | 'ANNOUNCEMENT'
        | 'RESULT'
        | 'EVENT',
      fileUrls: values.fileInfos.map((file) => file.url),
    });

    setIsEditModalOpen(false);
    router.push('/admin/notices');
  };

  if (isLoading) return <AdminLoading />;
  if (isError) return <NetworkError />;

  return (
    <section>
      <TitleBarModule title="공지 수정" type="LEFT" />
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
            <div className="w-full">
              <InputModule
                name="title"
                placeholder={
                  values.announcementType === 'RESULT'
                    ? '해당 게시글의 제목이 메인 페이지 배너에 노출됩니다'
                    : '제목을 입력하세요.'
                }
                textCount={30}
                value={values.title}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 py-7">
            {values.fileInfos.length > 0 && (
              <div className="py-2">
                <div className="flex flex-col gap-2">
                  {values.fileInfos.map((file, index) => {
                    const fileType = getFileType(file.url);
                    return (
                      <div key={file.url} className="flex items-center gap-2">
                        <FileModule
                          preview={file.url}
                          fileName={file.fileName}
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
          <div className="flex justify-end gap-5 pt-14">
            <ButtonAtom
              buttonStyle="dark"
              text="취소"
              type="button"
              width="fixed"
              onClick={() => router.push(`/admin/notices/${id}`)}
            />
            <ButtonAtom
              buttonStyle="yellow"
              text="수정"
              type="submit"
              width="fixed"
            />
          </div>
        </div>
      </form>
      {isEditModalOpen && (
        <ModalModule
          title="해당 게시글을 수정하시겠습니까?"
          cancelText="취소"
          confirmText="확인"
          onCancel={() => setIsEditModalOpen(false)}
          onConfirm={confirmEdit}
        >
          <div className="flex justify-center">
            <Image className="h-5 w-24" src={logo} alt="logo" />
          </div>
        </ModalModule>
      )}
    </section>
  );
};

export default AdminWriteNoticesEditPage;
