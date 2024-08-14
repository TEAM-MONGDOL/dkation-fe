import { useQuery } from '@tanstack/react-query';
import { pointPolicyDetailSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetPointPolicyDetailQueryKey = 'useGetPointPolicyDetailQuery';

export const useGetPointPolicyDetailQuery = ({
  id,
  enable = true,
}: {
  id: number | null;
  enable?: boolean;
}) => {
  return useQuery({
    queryKey: [useGetPointPolicyDetailQueryKey, id],
    queryFn: async () => {
      const res = await api.get(`/api/point/policy/${id}`);
      return pointPolicyDetailSchema.parse(res.data.data);
    },
    enabled: enable,
  });
};
