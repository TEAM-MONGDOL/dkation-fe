import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetMyReviewQueryKey } from '@/_hooks/user/useGetMyReviewQuery';
import { useGetMyWktHistoryQueryKey } from '@/_hooks/user/useGetMyWktHistoryQuery';
import api from '../Axios';

interface PostReviewRequest {
  wktId: number;
  contents: string;
  starRating: number;
  fileUrls: string[];
  openedType: 'TRUE' | 'FALSE';
}

export const usePostReviewMutation = ({
  successCallback,
  errorCallback,
}: {
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: PostReviewRequest) => {
      const response = await api.post('/api/review', request);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [useGetMyReviewQueryKey, useGetMyWktHistoryQueryKey],
      });
      queryClient.refetchQueries({
        queryKey: [useGetMyReviewQueryKey, useGetMyWktHistoryQueryKey],
      });
      successCallback && successCallback();
    },
    onError: (error: Error) => {
      errorCallback && errorCallback(error);
    },
  });
};
