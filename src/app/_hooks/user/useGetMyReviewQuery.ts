import { useQuery } from '@tanstack/react-query';
import { reviewsInfosForMeListSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetMyReviewQueryKey = 'useGetMyReviewQuery';

export const useGetMyReviewQuery = ({
  pageParam,
}: {
  pageParam: { page: number; size: number; sort?: string };
}) => {
  return useQuery({
    queryKey: [useGetMyReviewQueryKey],
    queryFn: async () => {
      const res = await api.get('/api/review/my', {
        params: { ...pageParam },
      });
      return reviewsInfosForMeListSchema.parse(res.data.data);
    },
  });
};
