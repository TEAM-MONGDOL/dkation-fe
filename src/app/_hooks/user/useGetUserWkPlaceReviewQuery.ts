import { useQuery } from '@tanstack/react-query';
import { workationUserPlaceReviewSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetUserWkPlaceReviewQuery = ({
  wktPlaceId,
  pageParam,
  enable,
}: {
  wktPlaceId: number | undefined;
  enable: boolean;
  pageParam: {
    page: number;
    size: number;
    sort?: string;
  };
}) => {
  return useQuery({
    queryKey: [wktPlaceId, pageParam],
    queryFn: async () => {
      const res = await api.get(`/api/review/wktplace/${wktPlaceId}`, {
        params: { ...pageParam },
      });
      return workationUserPlaceReviewSchema.parse(res.data.data);
    },
    enabled: enable,
  });
};
