import { useQuery } from '@tanstack/react-query';
import { workationReviewInfoSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetWkReviewListQueryKey = 'useGetWkReviewListQuery';
export const useGetWkReviewListQuery = ({
  regionFilter,
  minRating,
  maxRating,
  pageParam,
}: {
  regionFilter?: string[]; // 스트링 join(,) 으로 해야함
  minRating?: number;
  maxRating?: number;
  pageParam: {
    page: number;
    size: number;
    // sort?: string;
  };
}) => {
  return useQuery({
    queryKey: [useGetWkReviewListQueryKey],
    queryFn: async () => {
      const res = await api.get(`/api/review`, {
        params: {
          regionFilter,
          minRating,
          maxRating,
          ...pageParam,
        },
      });
      return workationReviewInfoSchema.parse(res.data.data);
    },
  });
};
