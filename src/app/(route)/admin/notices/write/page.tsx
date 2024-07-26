'use client';

import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import InputModule from '@/_components/common/modules/InputModule';
import FileContainer from '@/_components/common/containers/FileContainer';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import DropdownModule from '@/_components/common/modules/DropdownModule';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import { NoticeOptions } from '@/_constants/common';

const WriteNoticesPage = () => {
  const handleSelect = (option: string) => {};

  return (
    <div>
      <TitleBarModule title="공지 글쓰기" type="LEFT" />
      <div className="pt-10">
        <p className="text-3 font-bold mb-4">제목</p>
        <div className="flex gap-4">
          <DropdownModule
            options={NoticeOptions}
            onSelect={handleSelect}
            placeholder="구분 선택"
          />
          <div className="w-full">
            <InputModule placeholder="제목을 입력하세요" textCount={20} />
          </div>
        </div>
        <div className="py-7">
          <FileContainer />
        </div>
        <p className="text-3 font-bold mb-4">내용</p>
        <TextAreaModule
          placeholder="상세 내용을 입력하세요."
          size="LARGE"
          maxLength={2000}
        />
        <div className="flex justify-end pt-14">
          <ButtonAtom buttonType="yellow">글쓰기</ButtonAtom>
        </div>
      </div>
    </div>
  );
};

export default WriteNoticesPage;
