import { useQuery } from '@tanstack/react-query';
import { memberListSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetMemberListQueryKey = 'useGetMemberListQuery';

export const useGetMemberListQuery = ({
  searchParam,
  pageParam,
}: {
  searchParam: { searchText: string; department: string };
  pageParam: { page: number; size: number; sort?: string };
}) => {
  return useQuery({
    queryKey: [useGetMemberListQueryKey, searchParam, pageParam],
    queryFn: async () => {
      const { searchText, department } = searchParam;
      const res = await api.get('/api/member', {
        params: {
          searchText,
          department,
          ...pageParam,
        },
      });
      return memberListSchema.parse(res.data.data);
    },
  });
};
