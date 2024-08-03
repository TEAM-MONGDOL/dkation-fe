import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from '@tanstack/react-query';
import api from '@/_hooks/Axios';

interface PatchWkProps {
  wktId: number;
  wktPlaceId: number;
  thumbnailUrl: string;
  title: string;
  address: string;
  startDate: string;
  endDate: string;
  applyStartDate: string;
  applyEndDate: string;
  description: string;
  totalRecruit: number;
}

export const usePatchWkQuery = (
  wktId: number,
  successCallback?: () => void,
): UseMutationResult<void, Error, PatchWkProps> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      wktPlaceId,
      title,
      startDate,
      endDate,
      applyStartDate,
      applyEndDate,
      description,
      totalRecruit,
    }: PatchWkProps) => {
      const response = await api.patch(`/api/wkt/${wktId}`, {
        wktPlaceId,
        title,
        startDate,
        endDate,
        applyStartDate,
        applyEndDate,
        description,
        totalRecruit,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(); // Update with your actual query key
      if (successCallback) successCallback();
    },
    onError: (error: Error) => {
      console.error('Error updating workation:', error);
    },
  });
};
