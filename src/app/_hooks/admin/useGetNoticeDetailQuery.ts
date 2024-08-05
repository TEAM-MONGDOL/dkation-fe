import { useQuery } from '@tanstack/react-query';
import { announcementDetailSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetNoticeDetailQueryKey = 'useGetNoticeDetailQuery';

export const useGetNoticeDetailQuery = (id: number) => {
  return useQuery({
    queryKey: [useGetNoticeDetailQueryKey, id],
    queryFn: async () => {
      const res = await api.get(`/api/announcement/${id}`);
      return announcementDetailSchema.parse(res.data.data);
    },
  });
};
