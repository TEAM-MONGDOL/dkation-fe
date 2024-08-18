import {
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
import api from '../Axios';
import { useGetPointApplyKey } from './useGetPointApply';
import { getPointApplyDetailQueryKey } from './useGetPointApplyDetailQuery';

export const usePatchPointApplyMutation = ({
  pointApplyId,
  successCallback,
  errorCallback,
}: {
  pointApplyId: number;
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      pointApplyType,
      declinedReason,
    }: {
      pointApplyType: string;
      declinedReason?: string | null;
    }) => {
      const response = await api.patch(`/api/point/apply/${pointApplyId}`, {
        pointApplyType,
        declinedReason,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          useGetPointApplyKey,
          getPointApplyDetailQueryKey(pointApplyId),
        ],
      });
      successCallback && successCallback();
    },
    onError: (error: Error) => {
      errorCallback && errorCallback(error);
    },
  });
};
