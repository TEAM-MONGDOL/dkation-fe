import { useMutation, useQueryClient } from '@tanstack/react-query';
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

export const usePatchWkQuery = async ({
  successCallback,
}: {
  successCallback?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      wktId,
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
      await api.patch(`/api/wkt/${wktId}`, {
        wktId,
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
      queryClient.invalidateQueries({
        // queryKey: [워케이션목록키],
      });
      successCallback && successCallback();
    },
    onError: (error: Error) => {
      console.error('Error creating new workation:', error);
    },
  });
};
