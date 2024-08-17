import { useQuery } from '@tanstack/react-query';
import { memberListSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetMemberListQueryKey = 'useGetMemberListQuery';

export const useGetMemberListQuery = ({
  name,
  accountId,
  department,
  pageParam,
}: {
  name: string;
  accountId: string;
  department: string;
  pageParam: { page: number; size: number; sort?: string };
}) => {
  return useQuery({
    queryKey: [
      useGetMemberListQueryKey,
      name,
      accountId,
      department,
      pageParam,
    ],
    queryFn: async () => {
      const res = await api.get('/api/member', {
        params: {
          name,
          accountId,
          department,
          ...pageParam,
        },
      });
      return memberListSchema.parse(res.data.data);
    },
  });
};
