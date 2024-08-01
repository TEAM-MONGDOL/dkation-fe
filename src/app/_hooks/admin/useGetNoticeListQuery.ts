import { useQuery } from '@tanstack/react-query';
import { announcementListSchema } from '@/_types/adminType';
import api from '../Axios';

const useGetNoticeListQueryKey = 'useGetNoticeListQuery';

export const useGetNoticeListQuery = ({
  type,
  startDate,
  endDate,
  pageParam,
}: {
  type?: string;
  startDate?: string;
  endDate?: string;
  pageParam: {
    page: number;
    size: number;
    sort?: string;
  };
}) => {
  return useQuery({
    queryKey: [useGetNoticeListQueryKey],
    queryFn: async () => {
      const res = await api.get('api/announcement', {
        params: {
          type,
          startDate,
          endDate,
          ...pageParam,
        },
      });
      return announcementListSchema.parse(res.data.data);
    },
  });
};
