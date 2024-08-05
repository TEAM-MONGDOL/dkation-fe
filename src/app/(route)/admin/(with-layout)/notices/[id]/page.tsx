'use client';

import { useRouter } from 'next/navigation';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import InputModule from '@/_components/common/modules/InputModule';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import { useState } from 'react';
import ModalModule from '@/_components/common/modules/ModalModule';
import logo from '@/_assets/images/logo_imsy.png';
import Image from 'next/image';
import { useGetNoticeDetailQuery } from '@/_hooks/admin/useGetNoticeDetailQuery';
import FileModule from '@/_components/common/modules/FileModule';
import { useDeleteNoticeMutation } from '@/_hooks/admin/useDeleteNoticeMutation';

interface NoticeDetailPageProps {
  params: {
    id: string;
  };
}

const getFileType = (url: string | undefined) => {
  if (!url) return 'other';
  const extension = url.split('.').pop()?.toLowerCase();
  const imageExtensions = ['jpg', 'jpeg', 'png'];
  return extension && imageExtensions.includes(extension) ? 'image' : 'other';
};

const NoticeDetailPage = ({ params }: NoticeDetailPageProps) => {
  const { id } = params;
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleEdit = () => {
    router.push(`/admin/notices/${id}/edit`);
  };

  const { data, isLoading, isError } = useGetNoticeDetailQuery(Number(id));

  const { mutate: DeleteNotice } = useDeleteNoticeMutation({
    successCallback: () => {
      alert('삭제가 완료되었습니다.');
      setIsDeleteModalOpen(false);
      router.replace('/admin/notices');
    },
  });

  return (
    <section>
      <TitleBarModule title="공지 상세" type="LEFT" />
      {!data ? (
        isLoading ? (
          <div>로딩 중...</div>
        ) : isError ? (
          <div>에러 발생</div>
        ) : null
      ) : (
        <div className="pt-10">
          <p className="mb-4 text-3 font-bold">제목</p>
          <div className="flex gap-4">
            <div className="w-full">
              <InputModule
                name="title"
                placeholder="제목이 존재하지 않습니다."
                status="readonly"
                value={data.title}
              />
            </div>
          </div>
          <div className="py-4">
            {data.fileInfos && data.fileInfos.length > 0 ? (
              <div className="py-2">
                <div className="flex flex-col gap-2">
                  {data.fileInfos.map((file, index) => {
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
            <p className="mb-4 text-3 font-bold">내용</p>
            <TextAreaModule
              name="content"
              placeholder="내용이 존재하지 않습니다."
              size="LARGE"
              readonly
              value={data.description}
            />
          </div>
          <div className="flex justify-end gap-5 pt-14">
            <ButtonAtom
              width="fixed"
              type="button"
              buttonStyle="red"
              onClick={() => setIsDeleteModalOpen(true)}
              text="삭제"
            />
            <ButtonAtom
              width="fixed"
              type="button"
              buttonStyle="dark"
              onClick={handleEdit}
              text="수정"
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
                DeleteNotice(id);
              }}
            >
              <div className="flex justify-center">
                <Image className="h-5 w-24" src={logo} alt="logo" />
              </div>
            </ModalModule>
          )}
        </div>
      )}
    </section>
  );
};

export default NoticeDetailPage;
