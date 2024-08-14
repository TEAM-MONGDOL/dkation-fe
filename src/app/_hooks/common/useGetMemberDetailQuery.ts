import { useQuery } from '@tanstack/react-query';
import api from '@/_hooks/Axios';
import { memberDetailSchema } from '@/_types/adminType';

export const useGetMemberDetailQueryKey = 'useGetMemberDetailQuery';

export const useGetMemberDetailQuery = ({
  accountId,
  enable = true,
}: {
  accountId: string;
  enable?: boolean;
}) => {
  return useQuery({
    queryKey: [useGetMemberDetailQueryKey, accountId],
    queryFn: async () => {
      const res = await api.get(`/api/member/info`, {
        params: { accountId },
      });
      return memberDetailSchema.parse(res.data.data);
    },
    enabled: enable,
  });
};
