import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../Axios';

interface PostWkPlaceProps {
  place: string;
  thumbnailUrls: string[];
  maxPeople: number;
  address: string;
  description: string;
  latitude: string;
  longitude: string;
}
export const useGetWkPlaceListQuery = 'useGetWkPlaceListQuery';

export const useWkNewPlaceMutation = (successCallback?: () => void) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async ({
      place,
      thumbnailUrls,
      maxPeople,
      address,
      description,
      latitude,
      longitude,
    }: PostWkPlaceProps) => {
      await api.post(`/api/wkt/place`, {
        place,
        thumbnailUrls,
        maxPeople,
        address,
        description,
        latitude,
        longitude,
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
