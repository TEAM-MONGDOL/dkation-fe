import { useQuery } from '@tanstack/react-query';
import { wkDetailInfoSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetWkDetailQueryKey = 'useGetWkDetailQuery';

export const useGetWkDetailQuery = ({ wktId }: { wktId: number }) => {
  return useQuery({
    queryKey: [useGetWkDetailQueryKey, wktId],
    queryFn: async () => {
      const res = await api.get(`/api/wkt/${wktId}`, {
        params: {
          wktId,
        },
      });
      return wkDetailInfoSchema.parse(res.data.data);
    },
  });
};
