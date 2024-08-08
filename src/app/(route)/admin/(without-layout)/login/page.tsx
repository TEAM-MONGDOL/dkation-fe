'use client';

import { DkationLogo } from '@/_assets/icons';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import HeaderModule from '@/_components/common/modules/HeaderModule';
import InputModule from '@/_components/common/modules/InputModule';
import { useLoginMutation } from '@/_hooks/common/useLoginMutation';
import { AxiosErrorResponse } from '@/_types/commonType';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AdminLogin = () => {
  const router = useRouter();
  const [form, setForm] = useState<{
    accountId: string;
    password: string;
  }>({ accountId: '', password: '' });
  const [error, setError] = useState<string>('');

  const { mutate: tryLogin } = useLoginMutation({
    successCallback: (data) => {
      router.replace('/admin');
    },
    errorCallback: (err) => {
      if (axios.isAxiosError<AxiosErrorResponse>(err)) {
        setError(err.response?.data.message || '로그인에 실패했습니다.');
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (!form.accountId || !form.password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    tryLogin(form);
  };

  return (
    <div className="flex h-screen w-screen flex-col">
      <HeaderModule showLogout={false} />
      <section className="flex w-full grow flex-col items-center justify-center">
        <div className="flex w-[400px] flex-col items-center justify-center gap-y-6xl">
          <div className="flex w-full flex-col items-center justify-center gap-y-4">
            <Image src={DkationLogo} alt="company_logo" width={300} />
            <span className="text-2xl font-bold">관리자 로그인</span>
          </div>
          <form
            className="flex w-full flex-col items-center justify-center gap-y-4xl"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="flex w-full flex-col items-center gap-y-3">
              <InputModule
                type="text"
                name="accountId"
                value={form.accountId}
                onChange={handleChange}
                placeholder="이메일"
              />
              <InputModule
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="비밀번호"
              />
            </div>
            <p className="h-4 w-full text-center text-4 text-negative">
              {error}
            </p>
            <div className="flex w-full items-center justify-center gap-y-5">
              <ButtonAtom
                text="로그인"
                type="submit"
                buttonStyle="yellow"
                width="grow"
              />
            </div>
          </form>
        </div>
      </section>
      <div className="h-6xl w-full" />
    </div>
  );
};

export default AdminLogin;
