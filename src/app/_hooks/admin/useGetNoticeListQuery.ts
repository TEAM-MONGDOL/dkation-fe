import { useQuery } from '@tanstack/react-query';
import { announcementListSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetNoticeListQueryKey = 'useGetNoticeListQuery';

export const useGetNoticeListQuery = ({
  types,
  startDate,
  endDate,
  pageParam,
}: {
  types?: string;
  startDate?: string;
  endDate?: string;
  pageParam: {
    page: number;
    size: number;
    sort?: string;
  };
}) => {
  return useQuery({
    queryKey: [useGetNoticeListQueryKey, types, startDate, endDate, pageParam],
    queryFn: async () => {
      const res = await api.get('api/announcement', {
        params: {
          types,
          startDate,
          endDate,
          ...pageParam,
        },
      });
      return announcementListSchema.parse(res.data.data);
    },
  });
};
