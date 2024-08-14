import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetReviewDetailQueryKey } from '@/_hooks/user/useGetReviewDetailQuery';
import { useGetMyReviewQueryKey } from '@/_hooks/user/useGetMyReviewQuery';
import api from '../Axios';

export const useDeleteReviewMutation = ({
  successCallback,
  errorCallback,
}: {
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/api/review/${id}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [useGetReviewDetailQueryKey, useGetMyReviewQueryKey],
      });
      queryClient.refetchQueries({
        queryKey: [useGetReviewDetailQueryKey, useGetMyReviewQueryKey],
      });
      successCallback && successCallback();
    },
    onError: (error: Error) => {
      errorCallback && errorCallback(error);
    },
  });
};
