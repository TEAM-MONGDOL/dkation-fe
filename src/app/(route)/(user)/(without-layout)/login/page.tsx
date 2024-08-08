'use client';

import UserFindPasswordSection from '@/_components/user/login/UserFindPasswordSection';
import UserLoginSection from '@/_components/user/login/UserLoginSection';
import { useState } from 'react';

const Login = () => {
  const [type, setType] = useState<'LOGIN' | 'FIND_PASSWORD'>('LOGIN');
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
      {type === 'LOGIN' ? (
        <UserLoginSection
          onFindPasswordClick={() => setType('FIND_PASSWORD')}
        />
      ) : (
        <UserFindPasswordSection />
      )}
    </div>
  );
};

export default Login;
