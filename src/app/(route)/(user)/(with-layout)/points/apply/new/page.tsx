'use client';

import InputAreaAtom from '@/_components/common/atoms/InputAreaAtom';
import FileContainer from '@/_components/common/containers/FileContainer';
import DropdownModule from '@/_components/common/modules/DropdownModule';
import FileModule from '@/_components/common/modules/FileModule';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import { useGetPointPolicyQuery } from '@/_hooks/admin/useGetPointPolicyQuery';
import { usePostPointApplyMutation } from '@/_hooks/user/usePostPointApplyMutation';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const getFileType = (url: string) => {
  const parts = url.split('.');
  const extension = parts.length > 1 ? parts.pop()?.toLowerCase() : '';
  const imageExtensions = ['jpg', 'jpeg', 'png'];
  return imageExtensions.includes(extension || '') ? 'image' : 'other';
};

const PointsApplyNewPage = () => {
  const session = useSession();
  const router = useRouter();
  const [form, setForm] = useState<{
    policyId: number | null;
    description: string;
    fileInfo: { url: string; fileName: string }[];
  }>({
    policyId: null,
    description: '',
    fileInfo: [] as { url: string; fileName: string }[],
  });
  const {
    data: policyList,
    isLoading: policyListIsLoading,
    isError: policyListIsError,
  } = useGetPointPolicyQuery({
    pageable: { page: 1, size: 100 },
  });
  const { mutate: tryPostPointApply } = usePostPointApplyMutation({
    successCallback: () => {
      alert('포인트 신청이 완료되었습니다.');
      router.replace('/points/apply');
    },
    errorCallback: (error: Error) => {
      alert('포인트 신청에 실패했습니다.');
      console.error('Error posting point apply:', error);
    },
  });

  const handlePolicySelect = (option: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      policyId:
        policyList?.pointPolicyList.find(
          (policy) => policy.policyTitle === option,
        )?.id || null,
    }));
  };

  const handleFilesChange = (fileInfo: { url: string; fileName: string }[]) => {
    if (fileInfo.length > 1) {
      alert('파일은 1개만 업로드 가능합니다.');
      return;
    }

    setForm((prevForm) => ({
      ...prevForm,
      fileInfo,
    }));
  };

  const handlePostPointApply = () => {
    if (!form.policyId) {
      alert('분류를 선택해주세요.');
      return;
    }

    if (!form.description) {
      alert('설명을 입력해주세요.');
      return;
    }

    if (form.fileInfo.length < 1) {
      alert('증빙서류를 첨부해주세요.');
      return;
    }

    tryPostPointApply({
      accountId: session.data?.accountId || 0,
      data: {
        policyTitle:
          policyList?.pointPolicyList.find(
            (policy) => policy.id === form.policyId,
          )?.policyTitle || '',
        description: form.description,
        url: form.fileInfo[0].url,
      },
    });
  };

  if (policyListIsLoading) {
    return <div>로딩 중...</div>;
  }

  if (policyListIsError) {
    return <div>에러 발생</div>;
  }

  if (!policyList) {
    return <div>데이터 없음</div>;
  }

  return (
    <section className="flex w-full flex-col gap-y-14 px-40 pb-20 pt-18">
      <h2 className="text-h2 font-semibold text-sub-400">포인트 신청</h2>
      <div className="flex w-full flex-col gap-y-7">
        <div className="flex w-full items-center gap-x-4">
          <div className="flex flex-col gap-y-3">
            <span className="text-2 font-bold text-sub-400">분류</span>
            <DropdownModule
              options={policyList.pointPolicyList.map(
                (policy) => policy.policyTitle,
              )}
              size="large"
              placeholder="분류 선택"
              onSelect={handlePolicySelect}
              selectedOption={
                policyList.pointPolicyList.find(
                  (policy) => policy.id === form.policyId,
                )?.policyTitle || null
              }
            />
          </div>
          <div className="flex grow flex-col gap-y-3">
            <span className="text-2 font-bold text-sub-400">설명</span>
            <InputAreaAtom
              placeholder="신청 사유를 입력하세요."
              textCount={200}
              value={form.description}
              onChange={(e) =>
                setForm((prevForm) => ({
                  ...prevForm,
                  description: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-y-3">
          <span className="text-2 font-bold text-sub-400">증빙서류 제출</span>
          {form.fileInfo.length > 0 && (
            <div className="flex flex-col gap-y-2">
              {form.fileInfo.map((file, idx) => {
                const fileType = getFileType(file.url);
                return (
                  <div
                    key={file.fileName}
                    className="flex items-center gap-x-2"
                  >
                    <FileModule
                      isUser
                      preview={file.url}
                      fileName={file.fileName}
                      fileType={fileType}
                      buttonType="delete"
                      onDelete={() => {
                        setForm((prevForm) => ({
                          ...prevForm,
                          fileInfo: form.fileInfo.filter((_, i) => i !== idx),
                        }));
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}
          {form.fileInfo.length < 1 && (
            <FileContainer
              fileDomainType="POINT_APPLY"
              onFileChange={handleFilesChange}
              maxFileCount={1}
            />
          )}
        </div>
        <div className="flex items-center gap-x-4">
          <span className="text-2 font-bold text-sub-400">
            지급 예상 포인트
          </span>
          <p className="rounded border border-sub-100/50 px-4 py-3 text-2 font-medium">
            <span className="font-semibold">
              {policyList.pointPolicyList.find(
                (policy) => policy.id === form.policyId,
              )?.quantity || 0}
            </span>{' '}
            Point
          </p>
        </div>
      </div>
      <div className="flex w-full items-center justify-end gap-x-2.5">
        <UserButtonAtom
          text="취소하기"
          type="button"
          size="md"
          buttonStyle="white"
          className="rounded-lg"
          onClick={() => router.back()}
        />
        <UserButtonAtom
          text="신청하기"
          type="submit"
          size="md"
          buttonStyle="black"
          className="rounded-lg"
          onClick={handlePostPointApply}
        />
      </div>
    </section>
  );
};

export default PointsApplyNewPage;
