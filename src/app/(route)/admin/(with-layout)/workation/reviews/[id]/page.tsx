'use client';

import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import { useRouter } from 'next/navigation';

const AdminWorkationReviewDetailPage = () => {
  const router = useRouter();
  const blindReview = () => {
    router.push('/admin/notices/write');
  };
  return (
    <div>
      <TitleBarModule title="후기 상세" type="LEFT" />
      <div className="flex justify-end">
        <ButtonAtom
          text="블라인드"
          type="submit"
          width="fixed"
          buttonStyle="red"
          onClick={blindReview}
        />
      </div>
    </div>
  );
};

export default AdminWorkationReviewDetailPage;
