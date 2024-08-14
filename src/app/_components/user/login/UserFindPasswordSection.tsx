import { DkationLogo } from '@/_assets/icons';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import axios from 'axios';
import { AxiosErrorResponse } from '@/_types/commonType';
import UserModalAtom from '@/_components/user/common/atoms/UserModalAtom';
import UserLoginInput from '@/_components/user/login/UserLoginInput';
import { usePostCertificationSendMutation } from '@/_hooks/user/usePostCertificationSendMutation';
import { usePostCertificationCheckMutation } from '@/_hooks/user/usePostCertificationCheckMutation';
import { usePasswordChangeMutation } from '@/_hooks/user/usePasswordChangeMutation';

interface UserFindPasswordSectionProps {
  onLoginClick: () => void;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.*\s).{8,16}$/;

const UserFindPasswordSection = ({
  onLoginClick,
}: UserFindPasswordSectionProps) => {
  const [isVerificated, setIsVerificated] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState<string | null>(
    null,
  );
  const [verificationTime, setVerificationTime] = useState(180);
  const [modalContent, setModalContent] = useState<{
    desc: string;
    onClick: () => void;
    buttonText: string;
  } | null>(null);
  const [firstPassword, setFirstPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [firstPasswordError, setFirstPasswordError] = useState<string | null>(
    null,
  );
  const [secondPasswordError, setSecondPasswordError] = useState<string | null>(
    null,
  );

  const { mutate: trySendEmail, isPending: sendEmailIsPending } =
    usePostCertificationSendMutation({
      successCallback: () => {
        if (isEmailSent) {
          setVerificationTime(180);
        } else {
          setIsEmailSent(true);
        }
      },
      errorCallback: (err) => {
        if (axios.isAxiosError<AxiosErrorResponse>(err)) {
          setModalContent({
            desc: err.response?.data.message || '인증코드 전송에 실패했습니다.',
            onClick: () => setModalContent(null),
            buttonText: '확인',
          });
        }
      },
    });

  const {
    mutate: checkCertificationCode,
    isPending: checkCertificationCodeIsPending,
  } = usePostCertificationCheckMutation({
    successCallback: () => {
      setIsVerificated(true);
    },
    errorCallback: (err) => {
      if (axios.isAxiosError<AxiosErrorResponse>(err)) {
        setModalContent({
          desc: err.response?.data.message || '인증코드 확인에 실패했습니다.',
          onClick: () => setModalContent(null),
          buttonText: '확인',
        });
      }
    },
  });

  const { mutate: tryPasswordChange, isPending: tryPasswordChangeIsPending } =
    usePasswordChangeMutation({
      successCallback: () => {
        setModalContent({
          desc: '비밀번호가 변경이 완료되었습니다.',
          onClick: () => onLoginClick(),
          buttonText: '로그인하러 가기',
        });
      },
      errorCallback: (err) => {
        if (axios.isAxiosError<AxiosErrorResponse>(err)) {
          setModalContent({
            desc: err.response?.data.message || '비밀번호 변경에 실패했습니다.',
            onClick: () => setModalContent(null),
            buttonText: '다시 시도하기',
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
    return () => {};
  }, [isEmailSent]);

  const handleClickEmail = () => {
    if (!emailRegex.test(email)) {
      setError('이메일 형식이 올바르지 않습니다.');
      return;
    }

    setError(null);
    trySendEmail({ email });
  };

  const handleClickCode = () => {
    if (!isEmailSent) {
      setError('이메일 인증을 진행해주세요.');
      return;
    }
    if (verificationTime <= 0) {
      setVerificationError('인증시간이 만료되었습니다.');
      return;
    }

    setVerificationError(null);
    checkCertificationCode({ email, code: verificationCode });
  };

  const handleFirstPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFirstPassword(e.target.value);
    if (e.target.value && !passwordRegex.test(e.target.value)) {
      setFirstPasswordError(
        '8~16자의 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.',
      );
    } else {
      setFirstPasswordError(null);
    }
  };

  const handleSecondPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSecondPassword(e.target.value);
    if (firstPassword !== e.target.value) {
      setSecondPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setSecondPasswordError(null);
    }
  };

  const handleClickChangePassword = () => {
    if (
      !firstPassword ||
      !secondPassword ||
      firstPasswordError ||
      secondPasswordError
    ) {
      return;
    }

    tryPasswordChange({
      accountId: email.split('@')[0],
      password: firstPassword,
    });
  };

  return (
    <section className="flex flex-1 flex-col items-center justify-center bg-white">
      <div className="flex w-[400px] flex-col items-center gap-y-20">
        <Image src={DkationLogo} alt="Dkation Logo" width={255} />
        {isVerificated ? (
          <div className="flex w-full flex-col items-center gap-y-6">
            <div className="flex w-full flex-col gap-y-4xl">
              <div className="flex w-full flex-col gap-y-2.5">
                <UserLoginInput
                  type="password"
                  name="firstPassword"
                  value={firstPassword}
                  onChange={handleFirstPasswordChange}
                  placeholder="비밀번호"
                  error={firstPasswordError}
                />
                <UserLoginInput
                  type="password"
                  name="secondPassword"
                  value={secondPassword}
                  onChange={handleSecondPasswordChange}
                  placeholder="비밀번호 재입력"
                  error={secondPasswordError}
                />
              </div>
              <UserButtonAtom
                text="비밀번호 변경"
                size="full"
                buttonStyle="black"
                type="button"
                className={`${tryPasswordChangeIsPending ? 'animate-pulse text-sub-300' : ''}`}
                onClick={handleClickChangePassword}
              />
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-col items-center gap-y-6">
            <div className="flex w-full flex-col gap-y-4xl">
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
                      onClick={handleClickEmail}
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
                text={isEmailSent ? '비밀번호 변경' : '인증코드 확인'}
                size="full"
                buttonStyle="black"
                type="button"
                className={`${checkCertificationCodeIsPending ? 'animate-pulse text-sub-300' : ''}`}
                onClick={handleClickCode}
              />
            </div>
            <hr className="w-full border-sub-100" />
            <button
              className="px-2 py-1.5 text-5 text-sub-400 underline-offset-4 hover:underline"
              onClick={onLoginClick}
            >
              로그인하기
            </button>
          </div>
        )}
      </div>
      {modalContent !== null && (
        <UserModalAtom onClose={() => setModalContent(null)}>
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
