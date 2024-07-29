import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import InputModule from '@/_components/common/modules/InputModule';
import FileContainer from '@/_components/common/containers/FileContainer';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import React from 'react';

const AdminWorkationPlaceNewPage = () => {
  return (
    <div className="flex flex-col gap-7">
      <TitleBarModule title="장소 추가" type="LEFT" />
      <div className="flex w-full gap-7">
        <InputModule
          subtitle="이름"
          textCount={20}
          placeholder="장소 이름을 입력하세요."
        />
        <InputModule subtitle="주소" placeholder="주소를 입력하세요." />
      </div>
      <div className="flex w-full gap-7">
        <InputModule subtitle="최대 인원" placeholder="0" />
        <InputModule
          subtitle="등록 일시"
          status="disabled"
          value="2024.07.14"
        />
      </div>
      <FileContainer />
      <div>
        <p className="text-3 font-bold mb-4">상세 내용</p>
        <TextAreaModule
          placeholder="상세 내용을 입력하세요"
          size="MEDIUM"
          maxLength={100}
          name="상세내용"
        />
      </div>
      <div className="flex justify-end gap-5">
        <ButtonAtom buttonType="dark">취소</ButtonAtom>
        <ButtonAtom buttonType="yellow">등록</ButtonAtom>
      </div>
    </div>
  );
};

export default AdminWorkationPlaceNewPage;
