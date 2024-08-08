import { DkationLogo } from '@/_assets/icons';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import UserLoginInput from './UserLoginInput';
import UserButtonAtom from '../common/atoms/UserButtonAtom';
import { usePostCertificationSend } from '@/_hooks/user/usePostCertificationSend';
import axios from 'axios';
import { AxiosErrorResponse } from '@/_types/commonType';
import UserModalAtom from '../common/atoms/UserModalAtom';

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
  const [modalContent, setModalContent] = useState<{
    desc: string;
    onClick: () => void;
    buttonText: string;
  } | null>(null);

  const { mutate: trySendEmail, isPending: sendEmailIsPending } =
    usePostCertificationSend({
      successCallback: () => {
        if (isEmailSent) {
          setVerificationTime(180);
        } else {
          setIsEmailSent(true);
        }
      },
      errorCallback: (error) => {
        if (axios.isAxiosError<AxiosErrorResponse>(error)) {
          setModalContent({
            desc:
              error.response?.data.message || '인증코드 전송에 실패했습니다.',
            onClick: () => setModalContent(null),
            buttonText: '확인',
          });
        }
      },
    });

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

    trySendEmail({ email });
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
                    buttonStyle={sendEmailIsPending ? 'lightGray' : 'white'}
                    type="button"
                    className={`h-[34px] w-20 overflow-visible rounded text-4 ${sendEmailIsPending ? 'animate-pulse text-sub-300' : ''}`}
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
      {modalContent !== null && (
        <UserModalAtom>
          <div className="flex flex-col items-center justify-center gap-y-10">
            <p>{modalContent.desc}</p>
            <UserButtonAtom
              size="md"
              buttonStyle="yellow"
              text={modalContent.buttonText}
              onClick={modalContent.onClick}
              className="rounded-md py-1.5"
              type="button"
            />
          </div>
        </UserModalAtom>
      )}
    </section>
  );
};

export default UserFindPasswordSection;
