import { useQuery } from '@tanstack/react-query';
import api from '../Axios';
import { reviewInfosForMemberSchema } from '@/_types/userType';

export const useGetWkReviewListQueryKey = 'useGetWkReviewListQuery';

export const useGetWkReviewListQuery = ({
  pageable,
}: {
  pageable: {
    page: number;
    size: number;
    sort?: string;
  };
}) => {
  return useQuery({
    queryKey: [useGetWkReviewListQueryKey],
    queryFn: async () => {
      const res = await api.get(`/api/review`, {
        params: {
          ...pageable,
        },
      });
      return reviewInfosForMemberSchema.parse(res.data.data);
    },
  });
};
