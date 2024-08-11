'use client';

import React, { useState } from 'react';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import InputModule from '@/_components/common/modules/InputModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import DropdownModule from '@/_components/common/modules/DropdownModule';
import { useGetNoticeListQuery } from '@/_hooks/admin/useGetNoticeListQuery';
import { usePostBannerMutation } from '@/_hooks/admin/usePostBannerMutation';
import { useRouter } from 'next/navigation';
import ColorChartModule from '@/_components/admin/notices/StyleChartModule';
import { BannerStyleType, bannerStyleTypeList } from '@/_types/adminType';

const AddBannerPage = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    title: '',
    linkUrl: '',
    backgroundColor: '',
    announcementTitle: '',
    announcementType: '',
  });

  const [errors, setErrors] = useState({
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
    announcementType: notice.announcementType,
    title: notice.title,
  }));

  const findNoticeByTitle = (title: string) => {
    const notice = noticeOptions.find((option) => option.title === title);
    return notice || null;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleColorSelect = (color: BannerStyleType) => {
    setValues({ ...values, backgroundColor: color });
  };

  const handleNoticeSelect = (selectedTitle: string) => {
    const notice = findNoticeByTitle(selectedTitle);
    if (notice) {
      setValues({
        ...values,
        linkUrl: notice.id.toString(),
        announcementTitle: selectedTitle,
        announcementType: notice.announcementType,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      title: '',
      linkUrl: '',
      backgroundColor: '',
    };

    let isValid = true;

    if (!values.title) {
      newErrors.title = '배너 제목을 입력해 주세요.';
      isValid = false;
    }

    if (!values.linkUrl) {
      newErrors.linkUrl = '공지사항을 선택해 주세요.';
      isValid = false;
    }

    if (!values.backgroundColor) {
      newErrors.backgroundColor = '배경색을 선택해 주세요.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const { mutate: PostBanner } = usePostBannerMutation({
    successCallback: () => {
      alert('배너가 추가되었습니다.');
      router.replace('/admin/notices/banner');
    },
    errorCallback: (error: Error) => {
      console.error('failed create banner : ', error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const payload = { ...values };
      PostBanner(payload);
    }
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
          <div className="flex w-full flex-col">
            <InputModule
              name="title"
              placeholder="제목을 입력하세요"
              textCount={20}
              value={values.title}
              onChange={handleChange}
            />
            {errors.title && (
              <p className="text-4 text-negative">{errors.title}</p>
            )}
          </div>

          <div className="mb-3 mt-10 flex items-center gap-x-3">
            <p className="text-3 font-bold">링크</p>
            <p className="pt-2 text-4 text-sub-200/70">
              선택한 공지사항의 링크가 배너 클릭 시 이동할 URL로 설정됩니다.
            </p>
          </div>
          <div>
            <DropdownModule
              options={noticeOptions.map((option) => option.title)}
              onSelect={handleNoticeSelect}
              placeholder="공지사항을 선택하세요"
              selectedOption={
                noticeOptions.find(
                  (option) => option.id.toString() === values.linkUrl,
                )?.title || ''
              }
            />
            {errors.linkUrl && (
              <p className="pt-2 text-4 text-negative">{errors.linkUrl}</p>
            )}
          </div>

          <div className="mt-10">
            <p className="mb-3 text-3 font-bold">스타일</p>
            <ColorChartModule
              selectedColor={values.backgroundColor as BannerStyleType}
              onSelectColor={handleColorSelect}
              colorOptions={bannerStyleTypeList}
            />
            {errors.backgroundColor && (
              <p className="pt-2 text-4 text-negative">
                {errors.backgroundColor}
              </p>
            )}
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
