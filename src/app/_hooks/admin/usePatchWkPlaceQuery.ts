import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from '@tanstack/react-query';
import api from '@/_hooks/Axios';

interface PatchWkPlaceProps {
  place: string;
  fileUrls: string[];
  maxPeople: number;
  address: string;
  description: string;
}
export const useGetWkPlaceListQueryKey = 'useGetWkPlaceListQuery';
export const usePatchWkPlaceQuery = (
  wktPlaceId: number,
  successCallback?: () => void,
): UseMutationResult<void, Error, PatchWkPlaceProps> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      place,
      fileUrls,
      maxPeople,
      address,
      description,
    }: PatchWkPlaceProps) => {
      const response = await api.patch(`/api/wkt/place/${wktPlaceId}`, {
        place,
        fileUrls,
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
