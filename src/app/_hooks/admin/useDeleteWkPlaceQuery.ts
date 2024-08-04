import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/_hooks/Axios';

export const useGetWkPlaceListQueryKey = 'useGetWkPlaceListQuery';

export const useDeleteWkPlaceMutation = (wktPlaceId: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.delete(`api/wkt-place/${wktPlaceId}`);
    },
    onSuccess: () => {
      router.push('/admin/workation');
      queryClient.invalidateQueries({ queryKey: [useGetWkPlaceListQueryKey] });
      alert('워케이션 장소 삭제 완료');
    },
    onError: (error: Error) => {
      console.error('Error deleting workation place:', error);
    },
  });
};
