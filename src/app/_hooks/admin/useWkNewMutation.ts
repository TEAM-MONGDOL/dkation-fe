import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../Axios';

interface PostWkProps {
  wktPlaceId: number;
  title: string;
  startDate: string;
  endDate: string;
  applyStartDate: string;
  applyEndDate: string;
  description: string;
  totalRecruit: number;
}
export const useWkNewMutation = (successCallback?: () => void) => {
  const client = useQueryClient();

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
    }: PostWkProps) => {
      await api.post(`/api/wkt`, {
        wktPlaceId,
        title,
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
