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
import { usePatchWkPlaceQuery } from '@/_hooks/admin/usePatchWkPlaceQuery';
import { useGetWkPlaceDetailQuery } from '@/_hooks/admin/useGetWkPlaceDetailQuery';
import dayjs from 'dayjs';

interface WkPlaceEditProps {
  params: { id: number };
}
interface FileItem {
  name: string;
  url: string;
  type: 'image' | 'other';
}
const AdminWorkationPlaceEditPage = ({ params }: WkPlaceEditProps) => {
  const router = useRouter();
  const { id } = params;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const successCallback = () => {
    alert('워케이션 장소 수정 완료');
    router.push('/admin/workation/place');
  };
  const patchWkPlaceQuery = usePatchWkPlaceQuery(id, successCallback);
  const { data, isLoading, isError } = useGetWkPlaceDetailQuery({
    wktPlaceId: id,
  });
  const [values, setValues] = useState({
    placeName: '',
    address: '',
    maxPeople: 0,
    registrationDate: '',
    files: [] as string[],
    description: data?.wktPlaceDetailInfo.description,
  });
  React.useEffect(() => {
    if (data) {
      setValues({
        placeName: data.wktPlaceDetailInfo.place,
        address: data.wktPlaceDetailInfo.address,
        maxPeople: data.wktPlaceDetailInfo.maxPeople,
        registrationDate: dayjs(data.wktPlaceDetailInfo.createdAt).format(
          'YYYY.MM.DD',
        ),
        // files: data.wktPlaceDetailInfo.thumbnailUrls.filter(
        //   (url: string | null): url is string => url !== null,
        // ),
        files: ['https://example.com/images/gangnam_workation.jpg'],
        description: data.wktPlaceDetailInfo.description,
      });
    }
  }, [data]);
  if (isLoading) {
    return <div>Loading...</div>; // 로딩컴포넌트 추가시 변경예정
  }
  if (isError) {
    return <div>Error loading data</div>; // 에러컴포넌트 추가시 변경예정
  }
  if (!data) {
    return <div>No data</div>;
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  // const handleFilesChange = (newFiles: File[]) => {
  //   const fileItems: FileItem[] = newFiles.map((file) => ({
  //     name: file.name,
  //     url: URL.createObjectURL(file),
  //     type: file.type.startsWith('image') ? 'image' : 'other',
  //   }));
  //
  //   setValues({
  //     ...values,
  //     // files: fileItems,
  //   });
  // };
  const handleConfirmEdit = () => {
    const patchData = {
      place: values.placeName,
      thumbnailUrls: values.files,
      maxPeople: values.maxPeople,
      address: values.address,
      description: values.description || '',
    };
    patchWkPlaceQuery.mutate(patchData);
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
            {/* {values.files.map((file) => ( */}
            {/*  <FileModule */}
            {/*    key={file.url} */}
            {/*    fileName={file.name} */}
            {/*    fileType={file.type} */}
            {/*    fileUrl={file.url} */}
            {/*    buttonType="delete" */}
            {/*    onDelete={() => console.log(`Delete ${file.name}`)} // 추후 수정 예정 */}
            {/*  /> */}
            {/* ))} */}
          </div>
        ) : (
          ''
        )}
        {/* <FileContainer onFileChange={handleFilesChange} /> <div /> */}
        <p className="mb-4 text-3 font-bold">상세 내용</p>
        <TextAreaModule
          placeholder="상세 내용을 입력하세요"
          size="MEDIUM"
          maxLength={500}
          name="상세내용"
          value={values.description}
          onChange={handleChange}
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
          onConfirm={handleConfirmEdit}
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
                content: values.maxPeople.toString(),
              },
            ]}
          />
        </ModalModule>
      )}
    </section>
  );
};

export default AdminWorkationPlaceEditPage;
