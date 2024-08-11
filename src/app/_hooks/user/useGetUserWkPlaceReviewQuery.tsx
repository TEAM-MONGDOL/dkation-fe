import { useQuery } from '@tanstack/react-query';
import { workationUserPlaceReviewSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetUserWkPlaceReviewQuery = ({
  wktPlaceId,
}: {
  wktPlaceId: number | undefined;
}) => {
  return useQuery({
    queryKey: [wktPlaceId],
    queryFn: async () => {
      const res = await api.get(`/api/review/wktplace/${wktPlaceId}`);
      return workationUserPlaceReviewSchema.parse(res.data.data);
    },
  });
};
