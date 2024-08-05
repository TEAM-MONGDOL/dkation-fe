import { useQuery } from '@tanstack/react-query';
import { pointApplyDetailInfoSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetPointApplyDetailQueryKey = 'useGetPointApplyDetailQuery';

export const useGetPointApplyDetailQuery = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: [useGetPointApplyDetailQueryKey, id],
    queryFn: async () => {
      const response = await api.get(`/api/point/apply/${id}`);
      return pointApplyDetailInfoSchema.parse(response.data.data);
    },
  });
};
