'use client';

import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import InputModule from '@/_components/common/modules/InputModule';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import { useRouter } from 'next/navigation';
import FileModule from '@/_components/common/modules/FileModule';
import { useGetWkPlaceDetailQuery } from '@/_hooks/admin/useGetWkPlaceDetailQuery';

interface FileItem {
  name: string;
  url: string;
  type: 'image' | 'other';
}

interface WkPlaceDetailProps {
  params: { id: number };
}
const AdminWorkationPlaceDetailPage = ({ params }: WkPlaceDetailProps) => {
  const { id } = params;
  const { data, isLoading, isError } = useGetWkPlaceDetailQuery({
    wktPlaceId: id,
  });

  const router = useRouter();
  if (isLoading) {
    return <div>Loading...</div>; // 로딩컴포넌트 추가시 변경예정
  }
  if (isError) {
    return <div>Error loading data</div>; // 에러컴포넌트 추가시 변경예정
  }
  if (!data) {
    return <div>No data</div>;
  }
  return (
    <section className="flex flex-col gap-7">
      <TitleBarModule title="장소 추가" type="LEFT" />
      <div className="flex w-full gap-7">
        <InputModule
          subtitle="이름"
          value={data.place}
          name="placeName"
          status="readonly"
        />
        <InputModule
          subtitle="주소"
          value={data.address}
          name="address"
          status="readonly"
        />
      </div>
      <div className="flex w-full gap-7">
        <InputModule
          subtitle="최대 인원"
          value={data.maxPeople}
          name="maxPeople"
          status="readonly"
        />
        <InputModule
          subtitle="등록 일시"
          status="disabled"
          value={data.createAt}
        />
      </div>
      <div className="py-4">
        {data.thumbnailUrls.length > 0 && (
          <div className="py-2">
            <div className="flex flex-col gap-2">
              {/* 파일업로드 수정 시 변경정예정 */}
              {/* {data.thumbnailUrls.map((file) => ( */}
              {/*  <FileModule */}
              {/*    key={file.length} */}
              {/*    fileName={file.name} */}
              {/*    fileType={file.type} */}
              {/*    fileUrl={file.url} */}
              {/*    buttonType="download" */}
              {/*    onDownload={() => console.log(`Edit ${file.name}`)} // 추후 수정 예정 */}
              {/*  /> */}
              {/* ))} */}
            </div>
          </div>
        )}
      </div>{' '}
      <div>
        <p className="mb-4 text-3 font-bold">상세 내용</p>
        <TextAreaModule
          readonly
          size="MEDIUM"
          name="상세내용"
          value={data.description}
        />
      </div>
      <div className="flex justify-end">
        <ButtonAtom
          text="수정"
          type="button"
          width="fixed"
          buttonStyle="dark"
          onClick={() => router.push(`/admin/workation/place/${id}/edit`)}
        />
      </div>
    </section>
  );
};

export default AdminWorkationPlaceDetailPage;
