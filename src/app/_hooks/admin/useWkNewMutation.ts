import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../Axios';

interface PostWkProps {
  wktPlaceId: number;
  thumbnailUrl: string;
  title: string;
  address: string;
  startDate: Date;
  endDate: Date;
  applyStartDate: Date;
  applyEndDate: Date;
  description: string;
  totalRecruit: number;
}
export const useWkNewMutation = (successCallback?: () => void) => {
  const client = useQueryClient();

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
    }: PostWkProps) => {
      await api.post(`/api/wkt`, {
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
    },
    onSuccess: () => {
      client.invalidateQueries({
        // queryKey: [워케이션목록키],
      });
      successCallback && successCallback();
    },
    onError: (error: Error) => {
      console.error('Error creating new workation:', error);
    },
  });
};
