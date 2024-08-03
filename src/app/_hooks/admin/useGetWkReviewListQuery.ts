import { useQuery } from '@tanstack/react-query';
import { ReviewListInfoSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetWkReviewListQueryKey = 'useGetWkReviewListQuery';
export const useGetWkReviewListQuery = ({
  wktPlaceFilter,
  minRating,
  maxRating,
  pageParam,
}: {
  wktPlaceFilter?: string;
  minRating?: number;
  maxRating?: number;
  pageParam: {
    page: number;
    size: number;
    sort?: string;
  };
}) => {
  return useQuery({
    queryKey: [
      useGetWkReviewListQueryKey,
      wktPlaceFilter,
      minRating,
      maxRating,
      pageParam,
    ],
    queryFn: async () => {
      const res = await api.get(`/api/review`, {
        params: {
          wktPlaceFilter,
          minRating,
          maxRating,
          ...pageParam,
        },
      });
      return ReviewListInfoSchema.parse(res.data.data);
    },
  });
};
