import { useQuery } from '@tanstack/react-query';
import { wkUserDetailInfoSchema } from '@/_types/adminType';
import { wkDetailForMemberSchema } from '@/_types/userType';
import api from '../Axios';

export const useGetUserWkDetailQuery = ({ wktId }: { wktId: number }) => {
  return useQuery({
    queryKey: [wktId],
    queryFn: async () => {
      const res = await api.get(`/api/wkt/${wktId}`);
      return wkDetailForMemberSchema.parse(res.data.data);
    },
  });
};
