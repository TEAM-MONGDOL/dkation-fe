import { useQuery } from '@tanstack/react-query';
import { pointInfoListSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetMemberPointHistoryQueryKey = 'useGetMemberPointHistoryQuery';

export const useGetMemberPointHistoryQuery = ({
  accountId,
  startDate,
  endDate,
  isPositive,
  pageParam,
}: {
  accountId?: string;
  startDate?: string;
  endDate?: string;
  isPositive?: boolean;
  pageParam: {
    page: number;
    size: number;
    sort?: string;
  };
}) => {
  return useQuery({
    queryKey: [
      useGetMemberPointHistoryQueryKey,
      accountId,
      startDate,
      endDate,
      isPositive,
      pageParam,
    ],
    queryFn: async () => {
      const res = await api.get(`/api/point/member`, {
        params: {
          accountId,
          startDate,
          endDate,
          isPositive,
          ...pageParam,
        },
      });
      return pointInfoListSchema.parse(res.data.data);
    },
  });
};
