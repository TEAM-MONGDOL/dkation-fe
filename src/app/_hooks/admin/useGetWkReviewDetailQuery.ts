import { useQuery } from '@tanstack/react-query';
import { wktReviewDetailSchema } from '@/_types/adminType';
import api from '../Axios';

export const getReviewDetailQueryKey = (id: string) =>
  `useGetReviewDetailQuery-${id}`;

export const useGetWkReviewDetailQuery = ({
  reviewId,
}: {
  reviewId: number;
}) => {
  return useQuery({
    queryKey: [getReviewDetailQueryKey(reviewId.toString()), reviewId],
    queryFn: async () => {
      const res = await api.get(`/api/review/${reviewId}`, {
        params: {
          reviewId,
        },
      });
      return wktReviewDetailSchema.parse(res.data.data);
    },
    refetchOnMount: true,
  });
};
