import {
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
import api from '../Axios';
import { useGetPointApplyKey } from './useGetPointApply';
import { useGetPointApplyDetailQueryKey } from './useGetPointApplyDetailQuery';

export const usePatchPointApplyMutation = ({
  successCallback,
  errorCallback,
}: {
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      pointApplyId,
      pointApplyType,
      declinedReason,
    }: {
      pointApplyId: number;
      pointApplyType: string;
      declinedReason: string;
    }) => {
      const response = await api.patch(`/api/point-apply/${pointApplyId}`, {
        pointApplyType,
        declinedReason,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [useGetPointApplyKey, useGetPointApplyDetailQueryKey],
      });
      successCallback && successCallback();
    },
    onError: (error: Error) => {
      errorCallback && errorCallback(error);
    },
  });
};
