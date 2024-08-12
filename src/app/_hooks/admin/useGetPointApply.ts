import { useQuery } from '@tanstack/react-query';
import { pointApplyInfoListSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetPointApplyKey = 'useGetPointApply';

export const useGetPointApply = ({
  params,
  pageable,
  enable = true,
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
  enable?: boolean;
}) => {
  return useQuery({
    queryKey: [useGetPointApplyKey, params, pageable],
    queryFn: async () => {
      const res = await api.get('/api/point/apply', {
        params: {
          ...params,
          ...pageable,
        },
      });
      return pointApplyInfoListSchema.parse(res.data.data);
    },
    enabled: enable,
  });
};
