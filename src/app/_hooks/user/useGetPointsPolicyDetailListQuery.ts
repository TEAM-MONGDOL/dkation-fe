import { useQueries } from '@tanstack/react-query';
import { pointPolicyDetailSchema } from '@/_types/adminType';
import api from '../Axios';
import { useGetPointPolicyDetailQueryKey } from '../admin/useGetPointPolicyDetailQuery';

export const useGetPointPolicyDetailListQuery = ({
  ids,
  enable = true,
}: {
  ids: number[];
  enable?: boolean;
}) => {
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: [useGetPointPolicyDetailQueryKey, id],
      queryFn: async () => {
        const res = await api.get(`/api/point/policy/${id}`);
        return pointPolicyDetailSchema.parse(res.data.data);
      },
      enabled: enable,
    })),
  });
};
