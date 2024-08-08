import { DkationLogo } from '@/_assets/icons';
import Image from 'next/image';
import React from 'react';
import UserLoginInput from './UserLoginInput';

const UserFindPasswordSection = () => {
  const 
  return (
    <section className="flex flex-1 flex-col items-center justify-center bg-white">
      <div className="flex w-[400px] flex-col items-center gap-y-20">
        <Image src={DkationLogo} alt="Dkation Logo" width={255} />
        <div className="flex w-full flex-col items-center gap-y-6">
          <form
            className="flex w-full flex-col gap-y-4xl"
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
          <button
            className="px-2 py-1.5 text-5 text-sub-400 underline-offset-4 hover:underline"
            onClick={onFindPasswordClick}
          >
            비밀번호 찾기
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserFindPasswordSection;