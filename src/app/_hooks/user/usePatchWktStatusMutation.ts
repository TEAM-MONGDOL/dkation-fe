import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetMyWktHistoryQueryKey } from '@/_hooks/user/useGetMyWktHistoryQuery';
import api from '../Axios';

export const usePatchWktStatusMutation = ({
  wktId,
  successCallback,
  errorCallback,
}: {
  wktId: number;
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ status }: { status: string }) => {
      const res = await api.patch(`/api/apply/status/${wktId}`, {
        status,
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [useGetMyWktHistoryQueryKey, wktId],
      });
      queryClient.refetchQueries({
        queryKey: [useGetMyWktHistoryQueryKey, wktId],
      });
      successCallback && successCallback();
    },
    onError: (error: Error) => {
      errorCallback && errorCallback(error);
    },
  });
};
