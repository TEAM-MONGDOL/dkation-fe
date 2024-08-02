'use client';

import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AdminPointsPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/admin/points/reward');
  }, [router]);

  return null;
};

export default AdminPointsPage;
