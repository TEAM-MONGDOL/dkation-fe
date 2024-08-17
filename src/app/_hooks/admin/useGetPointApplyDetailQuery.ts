import { useQuery } from '@tanstack/react-query';
import { pointApplyDetailInfoSchema } from '@/_types/adminType';
import api from '../Axios';

export const getPointApplyDetailQueryKey = (id: number) =>
  `useGetPointApplyDetailQuery-${id}`;

export const useGetPointApplyDetailQuery = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: [getPointApplyDetailQueryKey(id)],
    queryFn: async () => {
      const response = await api.get(`/api/point/apply/${id}`);
      return pointApplyDetailInfoSchema.parse(response.data.data);
    },
    refetchOnMount: true,
  });
};
