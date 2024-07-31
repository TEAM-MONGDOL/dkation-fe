'use client';

import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import InputModule from '@/_components/common/modules/InputModule';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import { useRouter } from 'next/navigation';
import FileModule from '@/_components/common/modules/FileModule';

interface FileItem {
  name: string;
  url: string;
  type: 'image' | 'other';
}

const workationPlaceExample = {
  id: 1,
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
const AdminWorkationPlaceNewPage = () => {
  const router = useRouter();
  return (
    <section className="flex flex-col gap-7">
      <TitleBarModule title="장소 추가" type="LEFT" />
      <div className="flex w-full gap-7">
        <InputModule
          subtitle="이름"
          value={workationPlaceExample.placeName}
          name="placeName"
        />
        <InputModule
          subtitle="주소"
          value={workationPlaceExample.address}
          name="address"
        />
      </div>
      <div className="flex w-full gap-7">
        <InputModule
          subtitle="최대 인원"
          value={workationPlaceExample.maxPeople}
          name="maxPeople"
        />
        <InputModule
          subtitle="등록 일시"
          status="disabled"
          value={workationPlaceExample.registrationDate}
        />
      </div>
      <div className="py-4">
        {workationPlaceExample.files.length > 0 && (
          <div className="py-2">
            <div className="flex flex-col gap-2">
              {workationPlaceExample.files.map((file) => (
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
          </div>
        )}
      </div>{' '}
      <div>
        <p className="mb-4 text-3 font-bold">상세 내용</p>
        <TextAreaModule
          readonly
          placeholder="상세 내용을 입력하세요"
          size="MEDIUM"
          name="상세내용"
          value={workationPlaceExample.description}
        />
      </div>
      <div className="flex justify-end">
        <ButtonAtom
          text="수정"
          type="button"
          width="fixed"
          buttonStyle="dark"
          onClick={() =>
            router.push(`/admin/workation/${workationPlaceExample.id}/edit`)
          }
        />
      </div>
    </section>
  );
};

export default AdminWorkationPlaceNewPage;
