import api from '@/_hooks/Axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetWkReviewListQueryKey } from '@/_hooks/admin/useGetWkReviewListQuery';

interface PatchWkReviewProps {
  id: number;
  blindedType: string;
}

export const usePatchWkReviewMutation = (successCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, blindedType }: PatchWkReviewProps) => {
      const response = await api.patch('/api/review/blind', {
        id,
        blindedType,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [useGetWkReviewListQueryKey],
      });
      if (successCallback) successCallback();
    },
    onError: (error: Error) => {
      console.error('Error updating workation review:', error);
    },
  });
};
