'use client';

import { DkationLogo } from '@/_assets/icons';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import UserLoginInput from '@/_components/user/login/UserLoginInput';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

const Login = () => {
  const [form, setForm] = useState({
    accountId: '',
    password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.accountId || !form.password) {
      return;
    }
    console.log('tryLogin');
    console.log(form);
    const result = await signIn('credentials', {
      accountId: form.accountId,
      password: form.password,
      redirect: false,
    });

    if (result?.error) {
      console.log('로그인 실패');
      console.log(result);
    } else {
      const response = await fetch('/api/auth/session');
      const session = await response.json();

      if (session.user.isAdmin) {
        window.location.href = '/admin';
      } else {
        window.location.href = '/';
      }
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-1 flex-col justify-end bg-primary bg-login-bg bg-cover bg-center px-10 py-5xl">
        <div className="flex flex-col gap-y-6 text-4 font-medium text-sub-400">
          <p>
            디케이션 서비스를 통해 특별한 공간에서 업무를 보며
            <br />
            휴가와 업무를 동시에 즐겨보세요!
          </p>
          <p>매우 특별한 경험이 될 것을 기대합니다.</p>
        </div>
      </div>
      <section className="flex flex-1 flex-col items-center justify-center bg-white">
        <div className="flex w-[400px] flex-col items-center gap-y-20">
          <Image src={DkationLogo} alt="Dkation Logo" width={255} />
          <div className="flex w-full flex-col items-center gap-y-6">
            <form
              className="flex w-full flex-col gap-y-4xl"
              onSubmit={handleLogin}
            >
              <div className="flex w-full flex-col gap-y-2.5">
                <UserLoginInput
                  type="text"
                  name="accountId"
                  value={form.accountId}
                  onChange={onChange}
                  placeholder="아이디"
                  error={null}
                />
                <UserLoginInput
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  placeholder="비밀번호"
                  error={null}
                />
              </div>
              <UserButtonAtom
                text="로그인"
                size="full"
                buttonStyle="black"
                type="submit"
              />
            </form>
            <hr className="w-full border-sub-100" />
            <span className="cursor-pointer px-2 py-1.5 text-5 text-sub-400 underline-offset-4 hover:underline">
              비밀번호 찾기
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
