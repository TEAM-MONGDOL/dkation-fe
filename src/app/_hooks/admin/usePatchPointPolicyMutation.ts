import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../Axios';
import { useGetPointPolicyQueryKey } from './useGetPointPolicyQuery';
import { useGetPointPolicyDetailQueryKey } from './useGetPointPolicyDetailQuery';

export const usePatchPointPolicyMutation = ({
  policyId,
  successCallback,
  errorCallback,
}: {
  policyId: number;
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      policyTitle,
      detail,
      quantity,
    }: {
      policyTitle?: string;
      detail?: string;
      quantity?: number;
    }) => {
      const res = await api.patch(`/api/point/policy/${policyId}`, {
        policyTitle,
        detail,
        quantity,
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          useGetPointPolicyQueryKey,
          useGetPointPolicyDetailQueryKey,
          policyId,
        ],
      });
      queryClient.refetchQueries({
        queryKey: [useGetPointPolicyDetailQueryKey, policyId],
      });
      successCallback && successCallback();
    },
    onError: (error: Error) => {
      errorCallback && errorCallback(error);
    },
  });
};
