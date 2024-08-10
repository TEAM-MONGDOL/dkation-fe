import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetReviewDetailQueryKey } from '@/_hooks/user/useGetReviewDetailQuery';
import { useGetMyReviewQueryKey } from '@/_hooks/user/useGetMyReviewQuery';
import api from '../Axios';

export const usePatchReviewMutation = ({
  successCallback,
  errorCallback,
}: {
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      reviewId,
      contents,
      starRating,
      fileUrls,
      openedType,
    }: {
      reviewId: number;
      contents: string;
      starRating: number;
      fileUrls: string[];
      openedType: string;
    }) => {
      const res = await api.patch('api/review', {
        reviewId,
        contents,
        starRating,
        fileUrls,
        openedType,
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [useGetReviewDetailQueryKey, useGetMyReviewQueryKey],
      });
      queryClient.refetchQueries({
        queryKey: [useGetReviewDetailQueryKey],
      });
      successCallback && successCallback();
    },
    onError: (error: Error) => {
      errorCallback && errorCallback(error);
    },
  });
};
