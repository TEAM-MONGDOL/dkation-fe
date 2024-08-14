import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetBannerListInfiniteQuery } from '@/_hooks/admin/useGetBannerListInfiniteQuery';
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
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [useGetBannerListInfiniteQuery],
      });
      queryClient.refetchQueries({
        queryKey: [useGetBannerListInfiniteQuery],
      });
      successCallback && successCallback();
    },
    onError: (error: Error) => {
      errorCallback && errorCallback(error);
    },
  });
};
