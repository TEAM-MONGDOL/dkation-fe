import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetMemberPenaltyHistoryQueryKey } from '@/_hooks/admin/useGetMemberPenaltyHistoryQuery';
import api from '../Axios';

interface PostPenaltyRequest {
  wktId?: number;
  accountId: string;
  penaltyType: string;
}

export const usePostPenaltyMutation = ({
  successCallback,
  errorCallback,
}: {
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: PostPenaltyRequest) => {
      const response = await api.post('/api/penalty', request);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [useGetMemberPenaltyHistoryQueryKey],
      });
      successCallback && successCallback();
    },
    onError: (error: Error) => {
      errorCallback && errorCallback(error);
    },
  });
};
