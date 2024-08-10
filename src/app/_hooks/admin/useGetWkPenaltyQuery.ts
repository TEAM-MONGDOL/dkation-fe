import { useQuery } from '@tanstack/react-query';
import { WkResultPenaltyInfoSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetWkPenaltyQueryKey = 'useGetWkPenaltyQuery';

export const useGetWkPenaltyQuery = ({ wktId }: { wktId: number }) => {
  return useQuery({
    queryKey: [useGetWkPenaltyQueryKey, wktId],
    queryFn: async () => {
      const res = await api.get(`/api/wkt/${wktId}/result/stat`);
      return WkResultPenaltyInfoSchema.parse(res.data.data);
    },
  });
};
