import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetNoticeDetailQueryKey } from '@/_hooks/admin/useGetNoticeDetailQuery';
import api from '../Axios';

interface PostAnnouncementRequest {
  title: string;
  description: string;
  announcementType: string;
  fileUrls: string[];
}

export const usePostNoticeMutation = ({
  successCallback,
  errorCallback,
}: {
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: PostAnnouncementRequest) => {
      const response = await api.post('/api/announcement', request);
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [useGetNoticeDetailQueryKey],
      });
      queryClient.refetchQueries({
        queryKey: [useGetNoticeDetailQueryKey],
      });
      successCallback && successCallback();
    },
    onError: (error: Error) => {
      errorCallback && errorCallback(error);
    },
  });
};
