import { useQuery } from '@tanstack/react-query';
import { userApplyListSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetMyWktHistoryQueryKey = 'useGetMyWktHistoryQuery';

export const useGetMyWktHistoryQuery = ({
  startDate,
  endDate,
  statuses,
  pageParam,
}: {
  startDate?: string;
  endDate?: string;
  statuses?: string;
  pageParam: {
    page: number;
    size: number;
    sort?: string;
  };
}) => {
  return useQuery({
    queryKey: [
      useGetMyWktHistoryQueryKey,
      statuses,
      startDate,
      endDate,
      pageParam,
    ],
    queryFn: async () => {
      const res = await api.get(`/api/apply/my`, {
        params: {
          startDate,
          endDate,
          statuses,
          ...pageParam,
        },
      });
      return userApplyListSchema.parse(res.data.data);
    },
  });
};
