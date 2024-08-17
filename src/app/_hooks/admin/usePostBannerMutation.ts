import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetBannerListInfiniteQueryKey } from '@/_hooks/admin/useGetBannerListInfiniteQuery';
import api from '../Axios';

interface PostAnnouncementRequest {
  title: string;
  linkUrl: string;
  backgroundColor: string;
  announcementTitle: string;
  announcementType: string;
}

export const usePostBannerMutation = ({
  successCallback,
  errorCallback,
}: {
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: PostAnnouncementRequest) => {
      const response = await api.post('/api/banner', request);
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
      console.error('Failed to create banner:', error);
      errorCallback && errorCallback(error);
    },
  });
};
