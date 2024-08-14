import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetBannerListInfiniteQueryKey } from '@/_hooks/admin/useGetBannerListInfiniteQuery';
import api from '../Axios';

export const useDeleteBannerMutation = ({
  successCallback,
  errorCallback,
}: {
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/api/banner/${id}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [useGetBannerListInfiniteQueryKey],
      });
      queryClient.refetchQueries({
        queryKey: [useGetBannerListInfiniteQueryKey],
      });
      successCallback && successCallback();
    },
    onError: (error: Error) => {
      errorCallback && errorCallback(error);
    },
  });
};
