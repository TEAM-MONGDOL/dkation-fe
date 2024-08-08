import { useQuery } from '@tanstack/react-query';
import { wkUserDetailInfoSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetUserWkDetailQuery = ({ wktId }: { wktId: number }) => {
  return useQuery({
    queryKey: [wktId],
    queryFn: async () => {
      const res = await api.get(`/api/wkt/${wktId}`);
      return wkUserDetailInfoSchema.parse(res.data.data);
    },
  });
};
