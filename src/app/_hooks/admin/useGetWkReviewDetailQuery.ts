import { useQuery } from '@tanstack/react-query';
import { wktReviewDetailShema } from '@/_types/adminType';
import api from '../Axios';

export const useGetReviewDetailQueryKey = 'useGetReviewDetailQueryKey';

export const useGetWkReviewListQuery = ({ reviewId }: { reviewId: number }) => {
  return useQuery({
    queryKey: [useGetReviewDetailQueryKey, reviewId],
    queryFn: async () => {
      const res = await api.get(`/api/review/${reviewId}`, {
        params: {
          reviewId,
        },
      });
      return wktReviewDetailShema.parse(res.data.data);
    },
  });
};
