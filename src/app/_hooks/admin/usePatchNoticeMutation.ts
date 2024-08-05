import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetNoticeListQueryKey } from '@/_hooks/admin/useGetNoticeListQuery';
import { useGetNoticeDetailQueryKey } from '@/_hooks/admin/useGetNoticeDetailQuery';
import api from '../Axios';

interface PatchNoticeRequest {
  announcementId: string;
  title: string;
  description: string;
  announcementType: string;
  fileUrls: string[];
}

export const usePatchNoticeMutation = ({
  successCallback,
  errorCallback,
}: {
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (request: PatchNoticeRequest) => {
      try {
        const response = await api.patch('/api/announcement', request);
        return response.data;
      } catch (error) {
        console.error('Error patch notice :', error);
        throw error;
      }
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
      if (errorCallback) errorCallback(error);
    },
  });
};
