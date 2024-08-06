'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const UserSupportPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/support/notices`);
  }, [router]);

  return null;
};

export default UserSupportPage;
