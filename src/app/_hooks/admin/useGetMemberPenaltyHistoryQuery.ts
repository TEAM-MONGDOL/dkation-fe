import { useQuery } from '@tanstack/react-query';
import { penaltyListSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetMemberPenaltyHistoryQueryKey =
  'useGetMemberPenaltyHistoryQuery';

export const useGetMemberPenaltyHistoryQuery = ({
  accountId,
}: {
  accountId: string;
}) => {
  return useQuery({
    queryKey: [useGetMemberPenaltyHistoryQueryKey, accountId],
    queryFn: async () => {
      const res = await api.get(`/api/penalty/member`, {
        params: {
          accountId,
        },
      });
      return penaltyListSchema.parse(res.data.data);
    },
  });
};
