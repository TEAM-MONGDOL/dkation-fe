import { useQuery } from '@tanstack/react-query';
import {
  wkApplyPercentageInfoSchema,
  wkDetailInfoSchema,
} from '@/_types/adminType';
import api from '../Axios';

export const useGetUserPercentQueryKey = 'useGetUserPercentQuery';

export const useGetUserPercentQuery = ({
  wktId,
  point,
}: {
  wktId: number;
  point: number;
}) => {
  return useQuery({
    queryKey: [useGetUserPercentQueryKey, wktId, point],
    queryFn: async () => {
      const res = await api.get(`/api/apply/percentage/${wktId}`, {
        params: {
          point,
        },
      });
      return wkApplyPercentageInfoSchema.parse(res.data.data);
    },
  });
};
