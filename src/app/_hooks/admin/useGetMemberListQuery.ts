import { useQuery } from '@tanstack/react-query';
import { memberListSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetMemberListQueryKey = 'useGetMemberListQuery';

export const useGetMemberListQuery = ({
  department,
  pageParam,
}: {
  department?: string;
  pageParam: { pageNum: number; pageSize: number; sort?: string };
}) => {
  return useQuery({
    queryKey: [useGetMemberListQueryKey],
    queryFn: async () => {
      const res = await api.get('/api/member', {
        params: { department, ...pageParam },
      });
      return memberListSchema.parse(res.data.data);
    },
  });
};
