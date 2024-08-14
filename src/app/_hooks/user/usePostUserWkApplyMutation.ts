import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetMemberPointHistoryQueryKey } from '@/_hooks/admin/useGetMemberPointHistoryQuery';
import api from '../Axios';

export const usePostUserWkApplyMutation = ({
  successCallback,
}: {
  successCallback?: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      wktId,
      usedPoint,
    }: {
      wktId: number;
      usedPoint: number;
    }) => {
      await api.post(`/api/apply/${wktId}`, { usedPoint });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [useGetMemberPointHistoryQueryKey],
      });
      successCallback && successCallback();
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};
