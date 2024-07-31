import { useQuery } from '@tanstack/react-query';
import { workationListSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetWkListQueryKey = 'useGetWkListQuery';

export const useGetWkListQuery = () => {
  return useQuery({
    queryKey: [useGetWkListQueryKey],
    queryFn: async () => {
      const res = await api.get(`/api/wkt`);
      return workationListSchema.parse(res.data.data);
    },
  });
};
