import { useInfiniteQuery } from '@tanstack/react-query';
import { memberListSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetMemberListInfiniteQueryKey = 'useGetMemberListInfiniteQuery';

export const useGetMemberListInifiniteQuery = ({
  searchText,
  department,
  pageable,
}: {
  searchText?: string;
  department?: string;
  pageable: { page: number; size: number; sort: string };
}) => {
  return useInfiniteQuery({
    queryKey: [
      useGetMemberListInfiniteQueryKey,
      searchText,
      department,
      pageable.sort,
    ], // Include department and sort in the query key
    queryFn: async ({ pageParam = pageable }) => {
      const { page, size, sort } = pageParam; // Destructure page, size, and sort from pageParam
      const res = await api.get('/api/member', {
        params: { name: searchText, department, page, size, sort }, // Ensure the sort parameter is passed here
      });
      return memberListSchema.parse(res.data.data);
    },
    initialPageParam: { page: 1, size: 100, sort: 'name,ASC' }, // Include sort in the initialPageParam
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.totalElements === 0 ||
        lastPage.pageInfo.totalPages - 1 === lastPage.pageInfo.pageNum
        ? undefined
        : {
            page: lastPage.pageInfo.pageNum + 2,
            size: pageable.size,
            sort: pageable.sort,
          }; // Include sort in the nextPageParam
    },
  });
};
