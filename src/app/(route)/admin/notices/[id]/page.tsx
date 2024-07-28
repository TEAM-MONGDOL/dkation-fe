'use client';

import { useRouter } from 'next/navigation';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import InputModule from '@/_components/common/modules/InputModule';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import FileModule from '@/_components/common/modules/FileModule';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import { useState } from 'react';
import ModalModule from '@/_components/common/modules/ModalModule';
import logo from '@/_assets/images/logo_imsy.png';
import Image from 'next/image';

interface FileItem {
  name: string;
  url: string;
  type: 'image' | 'other';
}

const noticeExample = {
  id: 1,
  title: '제목입니다',
  content: '내용입니다 !!!!!!!!!!!!!',
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

const NoticeDetailPage = () => {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleEdit = () => {
    router.push(`/admin/notices/${noticeExample.id}/edit`);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <div>
      <TitleBarModule title="공지 상세" type="LEFT" />
      <div className="pt-10">
        <p className="text-3 font-bold mb-4">제목</p>
        <div className="flex gap-4">
          <div className="w-full">
            <InputModule
              name="title"
              placeholder="제목이 존재하지 않습니다."
              status="readonly"
              value={noticeExample.title}
            />
          </div>
        </div>
        <div className="py-7">
          {noticeExample.files.length > 0 ? (
            <div className="flex flex-col gap-2">
              {noticeExample.files.map((file) => (
                <FileModule
                  key={file.url}
                  fileName={file.name}
                  fileType={file.type}
                  fileUrl={file.url}
                  buttonType="download"
                  onDownload={() => console.log(`Edit ${file.name}`)} // 추후 수정 예정
                />
              ))}
            </div>
          ) : (
            <EmptyContainer />
          )}
        </div>
        <p className="text-3 font-bold mb-4">내용</p>
        <TextAreaModule
          name="content"
          placeholder="내용이 존재하지 않습니다."
          size="LARGE"
          readonly
          value={noticeExample.content}
        />
        <div className="flex justify-end pt-14 gap-5">
          <ButtonAtom buttonType="red" onClick={handleDelete}>
            삭제
          </ButtonAtom>
          <ButtonAtom buttonType="dark" onClick={handleEdit}>
            수정
          </ButtonAtom>
        </div>
        {isDeleteModalOpen && (
          <ModalModule
            title="해당 게시글을 삭제하시겠습니까?"
            cancelText="취소"
            confirmText="삭제"
            confirmButtonType="red"
            onClick={() => {
              setIsDeleteModalOpen(false);
            }}
            onCancel={() => {
              setIsDeleteModalOpen(false);
            }}
            onConfirm={() => {
              // 삭제 로직 위치
              setIsDeleteModalOpen(false);
              router.push('/admin/notices');
            }}
          >
            <div className="flex justify-center">
              <Image className="h-5 w-24" src={logo} alt="logo" />
            </div>
          </ModalModule>
        )}
      </div>
    </div>
  );
};

export default NoticeDetailPage;
