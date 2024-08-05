import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../Axios';
import { useGetPointPolicyQueryKey } from './useGetPointPolicyQuery';
import { useGetPointPolicyDetailQueryKey } from './useGetPointPolicyDetailQuery';

export const useDeletePointPolicyMutation = ({
  successCallback,
  errorCallback,
}: {
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/api/point/policy/${id}`);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [useGetPointPolicyQueryKey, useGetPointPolicyDetailQueryKey],
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
