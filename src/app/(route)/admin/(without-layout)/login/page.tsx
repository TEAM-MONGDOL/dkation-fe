'use client';

import { DkationLogo } from '@/_assets/icons';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import HeaderModule from '@/_components/common/modules/HeaderModule';
import InputModule from '@/_components/common/modules/InputModule';
import Image from 'next/image';
import { useState } from 'react';

const AdminLogin = () => {
  const [form, setForm] = useState<{
    email: string;
    password: string;
  }>({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
          <form className="flex w-full flex-col items-center justify-center gap-y-4xl">
            <div className="flex w-full flex-col items-center gap-y-3">
              <InputModule
                type="text"
                name="email"
                value={form.email}
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
            <div className="flex w-full items-center justify-center">
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
