import { useQuery } from '@tanstack/react-query';
import { applyListSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetMEmberWkHistoryQueryKey = 'useGetMEmberWkHistoryQuery';

export const useGetMemberWkHistoryQuery = ({
  accountId,
  startDate,
  endDate,
  statuses,
  place,
  pageParam,
}: {
  accountId?: string;
  startDate?: string;
  endDate?: string;
  statuses?: string;
  place?: string;
  pageParam: {
    pageNum: number;
    pageSize: number;
    sort?: string;
  };
}) => {
  return useQuery({
    queryKey: [useGetMEmberWkHistoryQueryKey],
    queryFn: async () => {
      const res = await api.get(`/api/apply/member/admin`, {
        params: {
          accountId,
          startDate,
          endDate,
          statuses,
          place,
          ...pageParam,
        },
      });
      return applyListSchema.parse(res.data.data);
    },
  });
};
