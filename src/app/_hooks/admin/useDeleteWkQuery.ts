import api from '@/_hooks/Axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useGetWkListQueryKey = 'useGetWkListQuery';

export const useDeleteWkMutation = (wktId: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.delete(`api/wkt/${wktId}`);
    },
    onSuccess: () => {
      router.push('/admin/workation');
      queryClient.invalidateQueries({ queryKey: ['useGetWkListQueryKey'] });
      alert('워케이션 삭제 완료');
    },
    onError: (error: Error) => {
      console.error('Error creating new workation:', error);
    },
  });
};
