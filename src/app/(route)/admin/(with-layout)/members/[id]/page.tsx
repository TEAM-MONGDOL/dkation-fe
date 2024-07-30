'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AdminMemberDetailPageProps {
  params: { id: string };
}

const AdminMemberDetailPage = ({ params }: AdminMemberDetailPageProps) => {
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (id) {
      router.replace(`/admin/members/${id}/wk-history`);
    }
  }, [id, router]);

  return null;
};

export default AdminMemberDetailPage;
