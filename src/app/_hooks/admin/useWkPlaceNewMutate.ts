import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../Axios';

interface PostWkPlaceProps {
  place: string;
  thumbnailUrls: string[];
  maxPeople: number;
  address: string;
  description: string;
}
export const useWkNewPlaceMutation = (successCallback?: () => void) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async ({
      place,
      thumbnailUrls,
      maxPeople,
      address,
      description,
    }: PostWkPlaceProps) => {
      await api.post(`/api/wkt-place`, {
        place,
        thumbnailUrls,
        maxPeople,
        address,
        description,
      });
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['useGetWkPlaceListQuery'],
      });
      successCallback && successCallback();
    },
    onError: (error: Error) => {
      console.error('Error creating new workation place:', error);
    },
  });
};
