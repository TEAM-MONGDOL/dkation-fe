import { useInfiniteQuery } from '@tanstack/react-query';
import { bannerInfoListSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetBannerListInfiniteQueryKey = 'useGetBannerListInfiniteQuery';

export const useGetBannerListInfiniteQuery = ({
  pageable,
}: {
  pageable: { page: number; size: number; sort?: string };
}) => {
  return useInfiniteQuery({
    queryKey: [useGetBannerListInfiniteQueryKey],
    queryFn: async ({ pageParam = pageable }) => {
      const res = await api.get('/api/banner', {
        params: { ...pageParam },
      });
      return bannerInfoListSchema.parse(res.data.data);
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
