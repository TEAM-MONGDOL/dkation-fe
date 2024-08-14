import { useQuery } from '@tanstack/react-query';
import { reviewsDetailInfoSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetReviewDetailQueryKey = 'useGetReviewDetailQuery';

export const useGetReviewDetailQuery = ({ reviewId }: { reviewId: number }) => {
  return useQuery({
    queryKey: [useGetReviewDetailQueryKey, reviewId],
    queryFn: async () => {
      const res = await api.get(`/api/review/${reviewId}`);
      return reviewsDetailInfoSchema.parse(res.data.data);
    },
  });
};
