import { useQuery } from '@tanstack/react-query';
import { pointApplyInfoListSchema } from '@/_types/adminType';
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
    pointTitle?: string;
    startDate?: string;
    endDate?: string;
  };
  pageable: {
    page?: number;
    size?: number;
    sort?: string;
  };
}) => {
  return useQuery({
    queryKey: [useGetPointApplyKey],
    queryFn: async () => {
      const res = await api.get('/api/point-apply', {
        params: {
          ...params,
          ...pageable,
        },
      });
      return pointApplyInfoListSchema.parse(res.data.data);
    },
  });
};
