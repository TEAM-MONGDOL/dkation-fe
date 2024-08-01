import { useQuery } from '@tanstack/react-query';
import api from '@/_hooks/Axios';
import { memberDetailSchema } from '@/_types/adminType';

export const useGetMemberDetailQueryKey = 'useGetMemberDetailQuery';

export const useGetMemberDetailQuery = ({
  accountId,
}: {
  accountId: string;
}) => {
  return useQuery({
    queryKey: [useGetMemberDetailQueryKey],
    queryFn: async () => {
      const res = await api.get(`/api/member/info`, {
        params: { accountId },
      });
      return memberDetailSchema.parse(res.data.data);
    },
  });
};
