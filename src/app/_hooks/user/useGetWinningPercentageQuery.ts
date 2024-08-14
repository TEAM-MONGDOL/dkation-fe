import { useQuery } from '@tanstack/react-query';
import { winningPercentageInfoSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetWinningPercentageQueryKey = 'useGetWinningPercentageQuery';

export const useGetWinningPercentageQuery = ({
  wktId,
  point,
  enable = true,
}: {
  wktId: number;
  point: number;
  enable?: boolean;
}) => {
  return useQuery({
    queryKey: [useGetWinningPercentageQueryKey, wktId, point],
    queryFn: async () => {
      const res = await api.get(`/api/apply/percentage/${wktId}`, {
        params: {
          point,
        },
      });
      return winningPercentageInfoSchema.parse(res.data.data);
    },
    enabled: enable,
  });
};
