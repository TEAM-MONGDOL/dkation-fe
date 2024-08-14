import { DkationLogo } from '@/_assets/icons';
import Image from 'next/image';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import UserLoginInput from './UserLoginInput';
import UserButtonAtom from '../common/atoms/UserButtonAtom';
import { useRouter } from 'next/navigation';

interface UserLoginSectionProps {
  onFindPasswordClick: () => void;
}

const UserLoginSection = ({ onFindPasswordClick }: UserLoginSectionProps) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
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
    const result = await signIn('credentials', {
      accountId: form.accountId,
      password: form.password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
      console.log('로그인 실패 : ', result);
    } else {
      router.refresh();
    }
  };
  return (
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
                error={error === '사용자를 찾을 수 없습니다.' ? error : null}
              />
              <UserLoginInput
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="비밀번호"
                error={error !== '사용자를 찾을 수 없습니다.' ? error : null}
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

export default UserLoginSection;
