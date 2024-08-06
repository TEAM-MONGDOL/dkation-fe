import { useQuery } from '@tanstack/react-query';
import { announcementDetailListSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetNoticeDetailQueryKey = 'useGetNoticeDetailQuery';

export const useGetNoticeDetailQuery = ({
  announcementId,
}: {
  announcementId: number;
}) => {
  return useQuery({
    queryKey: [useGetNoticeDetailQueryKey, announcementId],
    queryFn: async () => {
      const res = await api.get(`/api/announcement/${announcementId}`);
      return announcementDetailListSchema.parse(res.data.data);
    },
  });
};
