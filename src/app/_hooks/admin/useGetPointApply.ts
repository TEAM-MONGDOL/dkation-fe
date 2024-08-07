import { useQuery } from '@tanstack/react-query';
import { pointApplyInfoListSchema } from '@/_types/adminType';
import { useSession } from 'next-auth/react';
import api from '../Axios';

export const useGetPointApplyKey = 'useGetPointApply';

export const useGetPointApply = ({
  params,
  pageable,
}: {
  params: {
    name?: string;
    accountId?: string;
    applyTypes?: string;
    pointPolicyIds?: string;
    startDate?: string;
    endDate?: string;
  };
  pageable: {
    page?: number;
    size?: number;
    sort?: string;
  };
}) => {
  const session = useSession();
  return useQuery({
    queryKey: [useGetPointApplyKey, params, pageable],
    queryFn: async () => {
      const res = await api.get('/api/point/apply', {
        params: {
          ...params,
          ...pageable,
        },
        headers: {
          Authorization: `Bearer ${session.data?.accessToken}`,
        },
      });
      return pointApplyInfoListSchema.parse(res.data.data);
    },
  });
};
