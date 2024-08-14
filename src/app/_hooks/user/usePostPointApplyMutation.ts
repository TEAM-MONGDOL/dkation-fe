import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../Axios';
import { useGetPointApplyKey } from '../admin/useGetPointApply';

export const usePostPointApplyMutation = ({
  successCallback,
  errorCallback,
}: {
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      accountId,
      data,
    }: {
      accountId: number;
      data: {
        policyTitle: string;
        description: string;
        url: string;
      };
    }) => {
      const response = await api.post(`/api/point/apply/${accountId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [useGetPointApplyKey],
      });
      successCallback && successCallback();
    },
    onError: (error: Error) => {
      errorCallback && errorCallback(error);
    },
  });
};
