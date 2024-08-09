'use client';

import React, { useState } from 'react';
import UserInfosectionModule from '@/_components/user/common/modules/UserInfosectionModule';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import MyPoint from '@/_components/user/mypage/MyPoint';
import UserModalAtom from '@/_components/user/common/atoms/UserModalAtom';
import UserModalTitleAtom from '@/_components/user/common/atoms/UserModalTextAtom';
import UserPasswordInput from '@/_components/user/mypage/UserPasswordInput';
import { useSession } from 'next-auth/react';
import { useGetMemberDetailQuery } from '@/_hooks/admin/useGetMemberDetailQuery';

const UserMyPage = () => {
  const session = useSession();
  const accountId = String(session.data?.accountId || '');
  const { data, isLoading, isError } = useGetMemberDetailQuery({ accountId });

  const [currentModal, setCurrentModal] = useState<
    'none' | 'password' | 'newPassword' | 'completed'
  >('none');
  const [form, setForm] = useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    passwordError: null as string | null,
    newPasswordError: null as string | null,
    confirmPasswordError: null as string | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = () => {
    let hasError = false;
    const newErrors = { ...errors };

    if (form.password.trim() === '') {
      newErrors.passwordError = '비밀번호를 입력해주세요.';
      hasError = true;
    } else {
      newErrors.passwordError = null;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const validateNewPasswords = () => {
    let hasError = false;
    const newErrors = { ...errors };

    if (form.newPassword.trim() === '') {
      newErrors.newPasswordError = '새 비밀번호를 입력해 주세요.';
      hasError = true;
    } else {
      newErrors.newPasswordError = null;
    }

    if (form.confirmPassword.trim() === '') {
      newErrors.confirmPasswordError = '새 비밀번호를 한 번 더 입력해 주세요.';
      hasError = true;
    } else if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPasswordError = '비밀번호가 일치하지 않습니다.';
      hasError = true;
    } else {
      newErrors.confirmPasswordError = null;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleConfirm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentModal === 'password') {
      if (validatePassword()) {
        setCurrentModal('newPassword');
      }
    } else if (currentModal === 'newPassword') {
      if (validateNewPasswords()) {
        setCurrentModal('completed');
      }
    }
  };

  const closeModal = () => {
    setCurrentModal('none');
    setForm({ password: '', newPassword: '', confirmPassword: '' });
    setErrors({
      passwordError: null,
      newPasswordError: null,
      confirmPasswordError: null,
    });
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류 발생</div>;

  return (
    <section className="px-40 pt-18">
      <div className="pb-14">
        <MyPoint point={Number(data?.pointQuantity)} />
      </div>
      <h2 className="text-h2 font-semibold">회원정보</h2>
      <div className="py-14">
        <UserInfosectionModule title="이름">
          <p className="flex h-4xl w-[300px] items-center bg-sub-100/20 pl-3">
            {data?.name}
          </p>
        </UserInfosectionModule>
        <UserInfosectionModule title="아이디">
          <p className="flex h-4xl w-[300px] items-center bg-sub-100/20 pl-3">
            {data?.accountId}
          </p>
        </UserInfosectionModule>
        <UserInfosectionModule title="부서">
          <p className="flex h-4xl w-[300px] items-center bg-sub-100/20 pl-3">
            {data?.department}
          </p>
        </UserInfosectionModule>
        <UserInfosectionModule title="총 포인트">
          <p className="flex h-4xl w-[300px] items-center bg-sub-100/20 pl-3">
            {data?.pointQuantity} P
          </p>
        </UserInfosectionModule>
      </div>
      <h2 className="text-h2 font-semibold">비밀번호 변경</h2>
      <div className="py-14">
        <UserInfosectionModule title="비밀번호">
          <UserButtonAtom
            text="비밀번호 변경하기"
            size="md"
            buttonStyle="black"
            type="button"
            className="rounded-md"
            onClick={() => setCurrentModal('password')}
          />
        </UserInfosectionModule>
      </div>

      {currentModal === 'password' && (
        <UserModalAtom>
          <UserModalTitleAtom className="text-1 font-semibold">
            비밀번호 확인
          </UserModalTitleAtom>
          <p className="mt-4">현재 비밀번호를 입력하세요</p>
          <form className="mt-10" onSubmit={handleConfirm}>
            <UserPasswordInput
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="현재 비밀번호를 입력하세요."
              error={errors.passwordError}
            />
            <div className="flex justify-center gap-x-2 pt-16">
              <UserButtonAtom
                text="취소"
                size="md"
                buttonStyle="white"
                type="button"
                onClick={closeModal}
                className="rounded-md"
              />
              <UserButtonAtom
                text="확인"
                size="md"
                buttonStyle="yellow"
                type="submit"
                className="rounded-md"
              />
            </div>
          </form>
        </UserModalAtom>
      )}

      {currentModal === 'newPassword' && (
        <UserModalAtom>
          <UserModalTitleAtom className="text-1 font-semibold">
            비밀번호 변경
          </UserModalTitleAtom>
          <p className="mt-4">변경할 비밀번호를 입력해주세요.</p>
          <form className="mt-10" onSubmit={handleConfirm}>
            <div className="flex flex-col gap-y-1">
              <UserPasswordInput
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="새 비밀번호를 입력해 주세요."
                error={errors.newPasswordError}
              />
              <UserPasswordInput
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="새 비밀번호를 한 번 더 입력해 주세요."
                error={errors.confirmPasswordError}
              />
            </div>
            <div className="flex justify-center gap-x-2 pt-16">
              <UserButtonAtom
                text="취소"
                size="md"
                buttonStyle="white"
                type="button"
                onClick={closeModal}
                className="rounded-md"
              />
              <UserButtonAtom
                text="확인"
                size="md"
                buttonStyle="yellow"
                type="submit"
                className="rounded-md"
              />
            </div>
          </form>
        </UserModalAtom>
      )}

      {currentModal === 'completed' && (
        <UserModalAtom>
          <UserModalTitleAtom className="text-2">
            비밀번호 변경이 완료되었습니다.
          </UserModalTitleAtom>
          <div className="mt-10 flex justify-center">
            <UserButtonAtom
              text="확인"
              size="md"
              buttonStyle="yellow"
              type="button"
              className="rounded-md"
              onClick={closeModal}
            />
          </div>
        </UserModalAtom>
      )}
    </section>
  );
};

export default UserMyPage;
