import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../Axios';
import { useGetPointPolicyQueryKey } from './useGetPointPolicyQuery';

interface PostPointPolicyRequest {
  policyTitle: string;
  detail: string;
  quantity: number;
}

export const usePostPointPolicyMutation = ({
  successCallback,
  errorCallback,
}: {
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: PostPointPolicyRequest) => {
      const response = await api.post('/api/point/policy', request);
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [useGetPointPolicyQueryKey],
      });
      queryClient.refetchQueries({
        queryKey: [useGetPointPolicyQueryKey],
      });
      successCallback && successCallback();
    },
    onError: (error: Error) => {
      errorCallback && errorCallback(error);
    },
  });
};
