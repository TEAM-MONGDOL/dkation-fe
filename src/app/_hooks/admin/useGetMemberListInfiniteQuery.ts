import { useInfiniteQuery } from '@tanstack/react-query';
import { memberListSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetMemberListInfiniteQueryKey = 'useGetMemberListInfiniteQuery';

export const useGetMemberListInifiniteQuery = ({
  department,
  pageable,
}: {
  department?: string;
  pageable: { page: number; size: number; sort?: string };
}) => {
  return useInfiniteQuery({
    queryKey: [useGetMemberListInfiniteQueryKey],
    queryFn: async ({ pageParam = pageable }) => {
      const res = await api.get('/api/member', {
        params: { department, ...pageParam },
      });
      return memberListSchema.parse(res.data.data);
    },
    initialPageParam: { page: 1, size: 100 },
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.totalElements === 0 ||
        lastPage.pageInfo.totalPages - 1 === lastPage.pageInfo.pageNum
        ? undefined
        : { page: lastPage.pageInfo.pageNum + 2, size: pageable.size };
    },
  });
};
