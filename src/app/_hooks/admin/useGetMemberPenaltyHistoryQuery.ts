import { useQuery } from '@tanstack/react-query';
import { penaltyListSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetMemberPenaltyHistoryQueryKey =
  'useGetMemberPenaltyHistoryQuery';

export const useGetMemberPenaltyHistoryQuery = ({
  accountId,
  pageParam,
}: {
  accountId?: string;
  pageParam: {
    page: number;
    size: number;
    sort?: string;
  };
}) => {
  return useQuery({
    queryKey: [useGetMemberPenaltyHistoryQueryKey, accountId, pageParam],
    queryFn: async () => {
      const res = await api.get(`/api/penalty/member`, {
        params: {
          accountId,
          ...pageParam,
        },
      });
      return penaltyListSchema.parse(res.data.data);
    },
  });
};
