'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PointsPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/points/history');
  }, [router]);

  return null;
};

export default PointsPage;
