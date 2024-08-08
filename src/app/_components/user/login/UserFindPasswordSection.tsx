import { DkationLogo } from '@/_assets/icons';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import UserLoginInput from './UserLoginInput';
import UserButtonAtom from '../common/atoms/UserButtonAtom';

interface UserFindPasswordSectionProps {
  onLoginClick: () => void;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const UserFindPasswordSection = ({
  onLoginClick,
}: UserFindPasswordSectionProps) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationTime, setVerificationTime] = useState(180);

  useEffect(() => {
    if (isEmailSent) {
      const timer = setInterval(() => {
        setVerificationTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isEmailSent]);

  const handleClickCode = () => {
    if (!emailRegex.test(email)) {
      setError('이메일 형식이 올바르지 않습니다.');
      return;
    } else {
      setError(null);
    }

    if (isEmailSent) {
      setVerificationTime(180);
    } else {
      setIsEmailSent(true);
    }
  };

  return (
    <section className="flex flex-1 flex-col items-center justify-center bg-white">
      <div className="flex w-[400px] flex-col items-center gap-y-20">
        <Image src={DkationLogo} alt="Dkation Logo" width={255} />
        <div className="flex w-full flex-col items-center gap-y-6">
          <form className="flex w-full flex-col gap-y-4xl">
            <div className="flex w-full flex-col gap-y-2.5">
              <UserLoginInput
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="사내 이메일 입력"
                error={error}
                sideChildren={
                  <UserButtonAtom
                    text={isEmailSent ? '재전송' : '코드 전송'}
                    size="md"
                    buttonStyle="white"
                    type="button"
                    className={`h-[34px] w-20 overflow-visible rounded text-4`}
                    onClick={handleClickCode}
                  />
                }
              />
              {isEmailSent && (
                <UserLoginInput
                  type="text"
                  name="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="인증코드 입력"
                  error={null}
                  sideChildren={
                    <span className="text-4 text-primary">
                      {Math.floor(verificationTime / 60)}:
                      {verificationTime % 60 < 10
                        ? `0${verificationTime % 60}`
                        : verificationTime % 60}
                    </span>
                  }
                />
              )}
            </div>
            <UserButtonAtom
              text="인증코드 확인"
              size="full"
              buttonStyle="black"
              type="submit"
            />
          </form>
          <hr className="w-full border-sub-100" />
          <button
            className="px-2 py-1.5 text-5 text-sub-400 underline-offset-4 hover:underline"
            onClick={onLoginClick}
          >
            로그인하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserFindPasswordSection;
