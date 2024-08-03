import { useQuery } from '@tanstack/react-query';
import { PageableType, pointPolicyListSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetPointPolicyQueryKey = 'useGetPointPolicyQuery';

export const useGetPointPolicyQuery = ({
  pageable,
  searchParam,
}: {
  pageable: PageableType;
  searchParam: {
    startDate?: string;
    endDate?: string;
    minPoint?: number;
    maxPoint?: number;
    search?: string;
  };
}) => {
  return useQuery({
    queryKey: [useGetPointPolicyQueryKey, pageable, searchParam],
    queryFn: async () => {
      const res = await api.get('/api/point/policy', {
        params: {
          ...pageable,
          ...searchParam,
        },
      });
      return pointPolicyListSchema.parse(res.data.data);
    },
  });
};
