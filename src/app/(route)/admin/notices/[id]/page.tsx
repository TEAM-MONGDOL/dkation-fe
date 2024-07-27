'use client';

import { useRouter } from 'next/navigation';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import InputModule from '@/_components/common/modules/InputModule';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import FileModule from '@/_components/common/modules/FileModule';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';

interface FileItem {
  name: string;
  url: string;
  type: 'image' | 'other';
}

const noticeExample = {
  id: 1,
  title: '공지사항 안내',
  content: '공지사항 내용입니다아아아',
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

  const handleEdit = () => {
    router.push(`/admin/notices/edit/${noticeExample.id}`); // 추후 수정 예정
  };

  const handleDelete = () => {
    router.push('/admin/notices'); // 추후 수정 예정
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
              placeholder="제목을 입력하세요"
              textCount={20}
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
                  buttonType="edit"
                  onEdit={() => console.log(`Edit ${file.name}`)} // 추후 수정 예정
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
          placeholder="상세 내용을 입력하세요."
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
      </div>
    </div>
  );
};

export default NoticeDetailPage;
