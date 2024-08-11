import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetNoticeListQueryKey } from '@/_hooks/admin/useGetNoticeListQuery';
import { useGetNoticeDetailQueryKey } from '@/_hooks/admin/useGetNoticeDetailQuery';
import api from '../Axios';

export const useDeleteWktApplyMutation = ({
  successCallback,
  errorCallback,
}: {
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (wktId: number) => {
      const response = await api.delete(`/api/apply/${wktId}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [useGetNoticeListQueryKey, useGetNoticeDetailQueryKey],
      });
      queryClient.refetchQueries({
        queryKey: [useGetNoticeListQueryKey, useGetNoticeDetailQueryKey],
      });
      successCallback && successCallback();
    },
    onError: (error: Error) => {
      errorCallback && errorCallback(error);
    },
  });
};
