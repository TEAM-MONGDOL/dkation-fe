import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetMyWktHistoryQueryKey } from '@/_hooks/user/useGetMyWktHistoryQuery';
import api from '../Axios';

export const usePatchBettingPointMutation = ({
  applyId,
  successCallback,
  errorCallback,
}: {
  applyId: number;
  successCallback?: (usedPoint: number) => void;
  errorCallback?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ usedPoint }: { usedPoint: number }) => {
      const res = await api.patch(`/api/apply/${applyId}`, { usedPoint });
      return usedPoint; // 클라이언트에서 사용된 usedPoint 반환
    },
    onSuccess: (usedPoint) => {
      console.log('Updated usedPoint:', usedPoint);
      queryClient.invalidateQueries({
        queryKey: [useGetMyWktHistoryQueryKey, applyId],
      });
      queryClient.refetchQueries({
        queryKey: [useGetMyWktHistoryQueryKey, applyId],
      });
      if (successCallback) {
        successCallback(usedPoint);
      }
    },
    onError: (error: Error) => {
      if (errorCallback) {
        errorCallback(error);
      }
    },
  });
};
