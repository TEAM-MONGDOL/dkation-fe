import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from '@tanstack/react-query';
import api from '@/_hooks/Axios';

interface PatchWkProps {
  place: string;
  thumbnailUrls: string[];
  maxPeople: number;
  address: string;
  description: string;
}
export const useGetWkPlaceListQueryKey = 'useGetWkPlaceListQuery';
export const usePatchWkPlaceQuery = (
  wktPlaceId: number,
  successCallback?: () => void,
): UseMutationResult<void, Error, PatchWkProps> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      place,
      thumbnailUrls,
      maxPeople,
      address,
      description,
    }: PatchWkProps) => {
      const response = await api.patch(`/api/wkt-place/${wktPlaceId}`, {
        place,
        thumbnailUrls,
        maxPeople,
        address,
        description,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [useGetWkPlaceListQueryKey],
      });
      if (successCallback) successCallback();
    },
    onError: (error: Error) => {
      console.error('Error updating workation place:', error);
    },
  });
};
