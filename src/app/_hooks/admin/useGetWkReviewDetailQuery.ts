import { useQuery } from '@tanstack/react-query';
import { wktReviewDetailSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetReviewDetailQueryKey = 'useGetReviewDetailQueryKey';

export const useGetWkReviewDetailQuery = ({
  reviewId,
}: {
  reviewId: number;
}) => {
  return useQuery({
    queryKey: [useGetReviewDetailQueryKey, reviewId],
    queryFn: async () => {
      const res = await api.get(`/api/review/${reviewId}`, {
        params: {
          reviewId,
        },
      });
      return wktReviewDetailSchema.parse(res.data.data);
    },
  });
};
