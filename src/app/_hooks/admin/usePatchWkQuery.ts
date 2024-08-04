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
export const useGetWkListQueryKey = 'useGetWkListQuery';
export const usePatchWkQuery = (
  wktId: number,
  successCallback?: () => void,
): UseMutationResult<void, Error, PatchWkProps> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      wktPlaceId,
      thumbnailUrl,
      title,
      address,
      startDate,
      endDate,
      applyStartDate,
      applyEndDate,
      description,
      totalRecruit,
    }: PatchWkProps) => {
      const response = await api.patch(`/api/wkt/${wktId}`, {
        wktPlaceId,
        thumbnailUrl,
        title,
        address,
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
      queryClient.invalidateQueries({ queryKey: ['useGetWkListQueryKey'] });
      if (successCallback) successCallback();
    },
    onError: (error: Error) => {
      console.error('Error updating workation:', error);
    },
  });
};
