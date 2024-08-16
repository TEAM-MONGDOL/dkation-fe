import { useRouter } from 'next/navigation';
import { DkationLogo } from '@/_assets/icons';
import Image from 'next/image';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import UserLoginInput from './UserLoginInput';
import UserButtonAtom from '../common/atoms/UserButtonAtom';

interface UserLoginSectionProps {
  onFindPasswordClick: () => void;
}

const UserLoginSection = ({ onFindPasswordClick }: UserLoginSectionProps) => {
  const router = useRouter();
  const [idError, setIdError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
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

    setIdError(null);
    setPasswordError(null);

    if (!form.accountId) {
      setIdError('아이디를 입력해주세요.');
      return;
    }

    if (!form.password) {
      setPasswordError('비밀번호를 입력해주세요.');
      return;
    }

    const result = await signIn('credentials', {
      accountId: form.accountId,
      password: form.password,
      redirect: false,
    });

    if (result?.error) {
      if (result.error === '사용자를 찾을 수 없습니다.') {
        setIdError(result.error);
        return;
      }
      if (result.error !== '사용자를 찾을 수 없습니다.') {
        setPasswordError(result.error);
        return;
      }
      console.log('로그인 실패 : ', result);
    } else {
      router.replace('/');
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
                error={idError}
              />
              <UserLoginInput
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="비밀번호"
                error={passwordError}
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
