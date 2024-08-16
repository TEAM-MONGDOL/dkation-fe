import { useInfiniteQuery } from '@tanstack/react-query';
import { userApplyListSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetMyWktHistoryQueryKey = 'useGetMyWktHistoryQuery';

export const useGetMyWktHistoryQuery = ({
  startDate,
  endDate,
  statuses,
  pageable,
}: {
  startDate?: string;
  endDate?: string;
  statuses?: string;
  pageable: {
    page: number;
    size: number;
    sort?: string;
  };
}) => {
  return useInfiniteQuery({
    queryKey: [
      useGetMyWktHistoryQueryKey,
      statuses,
      startDate,
      endDate,
      pageable,
    ],
    queryFn: async ({ pageParam = pageable }) => {
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
    initialPageParam: { page: 1, size: 10 },
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.totalElements === 0 ||
        lastPage.pageInfo.totalPages - 1 === lastPage.pageInfo.pageNum
        ? undefined
        : { page: lastPage.pageInfo.pageNum + 2, size: pageable.size };
    },
  });
};
