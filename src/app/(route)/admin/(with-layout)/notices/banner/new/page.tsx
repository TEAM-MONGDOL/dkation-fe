'use client';

import React, { useState } from 'react';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import InputModule from '@/_components/common/modules/InputModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import ColorChartModule from '@/_components/admin/notices/StyleChartModule';
import DropdownModule from '@/_components/common/modules/DropdownModule';
import { useGetNoticeListQuery } from '@/_hooks/admin/useGetNoticeListQuery';

const AddBannerPage = () => {
  const [values, setValues] = useState({
    title: '',
    linkUrl: '',
    backgroundColor: '',
  });

  const { data } = useGetNoticeListQuery({
    pageParam: { page: 1, size: 100 },
  });

  const noticeInfos = data?.announcementInfos || [];
  const noticeOptions = noticeInfos.map((notice) => ({
    id: notice.id,
    title: notice.title,
  }));

  const findIdByTitle = (title: string) => {
    const notice = noticeOptions.find((option) => option.title === title);
    return notice ? notice.id.toString() : '';
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleColorSelect = (color: string) => {
    setValues({ ...values, backgroundColor: color });
  };

  const handleNoticeSelect = (selectedTitle: string) => {
    const id = findIdByTitle(selectedTitle);
    setValues({
      ...values,
      linkUrl: id,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('제목:', values.title);
    console.log('링크:', values.linkUrl);
    console.log('배경색:', values.backgroundColor);
    const payload = { ...values };
  };

  return (
    <section>
      <TitleBarModule title="배너 추가하기" type="LEFT" />
      <form onSubmit={handleSubmit} className="">
        <div className="w-3/5 pt-10">
          <div className="mb-3 flex items-center gap-x-3">
            <p className="text-3 font-bold">제목</p>
            <p className="text-4 text-sub-200/70">
              해당 필드의 입력값이 사용자 메인 페이지에 노출됩니다.
            </p>
          </div>
          <div className="flex w-full">
            <InputModule
              name="title"
              placeholder="제목을 입력하세요"
              textCount={20}
              value={values.title}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 mt-10 flex items-center gap-x-3">
            <p className="text-3 font-bold">링크</p>
            <p className="text-4 text-sub-200/70">
              선택한 공지사항의 링크가 배너 클릭 시 이동할 URL로 설정됩니다.
            </p>
          </div>
          <div>
            <DropdownModule
              options={noticeOptions.map((option) => option.title)} // 제목을 표시합니다.
              onSelect={handleNoticeSelect}
              placeholder="공지사항을 선택하세요"
              selectedOption={
                noticeOptions.find(
                  (option) => option.id.toString() === values.linkUrl,
                )?.title || ''
              }
            />
          </div>

          <div className="mt-10">
            <p className="mb-3 text-3 font-bold">스타일</p>
            <ColorChartModule
              selectedColor={values.backgroundColor}
              onSelectColor={handleColorSelect}
            />
          </div>
        </div>
        <div className="flex justify-end pt-16">
          <ButtonAtom buttonStyle="yellow" text="등록" type="submit" />
        </div>
      </form>
    </section>
  );
};

export default AddBannerPage;
