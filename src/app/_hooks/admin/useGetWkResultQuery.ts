import { useQuery } from '@tanstack/react-query';
import { wkDetailInfoSchema, WkResultInfoSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetWkResultQueryKey = 'useGetWkResultQuery';

export const useGetWkResultQuery = ({ wktId }: { wktId: number }) => {
  return useQuery({
    queryKey: [useGetWkResultQueryKey, wktId],
    queryFn: async () => {
      const res = await api.get(`/api/wkt/${wktId}/result`, {
        params: {
          wktId,
        },
      });
      return WkResultInfoSchema.parse(res.data.data);
    },
  });
};
