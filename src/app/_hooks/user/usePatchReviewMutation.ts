import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetReviewDetailQueryKey } from '@/_hooks/user/useGetReviewDetailQuery';
import { useGetMyReviewQueryKey } from '@/_hooks/user/useGetMyReviewQuery';
import api from '../Axios';

export const usePatchReviewMutation = ({
  reviewId,
  successCallback,
  errorCallback,
}: {
  reviewId: number;
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      contents,
      starRating,
      fileUrls,
      openedType,
    }: {
      contents: string;
      starRating: number;
      fileUrls: string[];
      openedType: string;
    }) => {
      const res = await api.patch(`api/review/${reviewId}`, {
        contents,
        starRating,
        fileUrls,
        openedType,
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          useGetReviewDetailQueryKey,
          useGetMyReviewQueryKey,
          reviewId,
        ],
      });
      queryClient.refetchQueries({
        queryKey: [
          useGetReviewDetailQueryKey,
          useGetMyReviewQueryKey,
          reviewId,
        ],
      });
      successCallback && successCallback();
    },
    onError: (error: Error) => {
      errorCallback && errorCallback(error);
    },
  });
};
