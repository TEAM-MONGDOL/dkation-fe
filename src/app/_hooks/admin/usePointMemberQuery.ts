import { useQuery } from '@tanstack/react-query';
import { pointInfoListSchema } from '@/_types/adminType';
import api from '../Axios';

export const usePointMemberQueryKey = 'usePointMemberQuery';

export const usePointMemberQuery = () => {
  return useQuery({
    queryKey: [usePointMemberQueryKey],
    queryFn: async () => {
      const res = await api.get(`/api/penalty/member`);
      return pointInfoListSchema.parse(res.data.data);
    },
  });
};
