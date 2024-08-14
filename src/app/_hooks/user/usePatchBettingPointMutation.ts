import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetMyWktHistoryQueryKey } from '@/_hooks/user/useGetMyWktHistoryQuery';
import api from '../Axios';

export const usePatchBettingPointMutation = ({
  applyId,
  successCallback,
  errorCallback,
}: {
  applyId: number;
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ usedPoint }: { usedPoint: number }) => {
      const res = await api.patch(`/api/apply/${applyId}`, {
        usedPoint,
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [useGetMyWktHistoryQueryKey, applyId],
      });
      queryClient.refetchQueries({
        queryKey: [useGetMyWktHistoryQueryKey, applyId],
      });
      successCallback && successCallback();
    },
    onError: (error: Error) => {
      errorCallback && errorCallback(error);
    },
  });
};
