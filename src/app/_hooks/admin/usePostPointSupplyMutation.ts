import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../Axios';
import { useGetPointSupplyQueryKey } from './useGetPointSupplyQuery';

export const usePostPointSupplyMutation = ({
  successCallback,
  errorCallback,
}: {
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
}) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async ({
      policyId,
      body,
    }: {
      policyId: number;
      body: { accountId: string }[];
    }) => {
      await api.post(`/api/point/supply/${policyId}`, {
        memberInfos: body,
      });
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [useGetPointSupplyQueryKey],
      });
      successCallback && successCallback();
    },
    onError: (error: Error) => {
      errorCallback && errorCallback(error);
    },
  });
};
