import { useQuery } from '@tanstack/react-query';
import { workationListSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetWkListQueryKey = 'useGetWkListQuery';

export const useGetWkListQuery = ({
  status,
  wktPlaceIdList,
  applyStartDate,
  applyEndDate,
  wktStartDate,
  wktEndDate,
  pageParam,
}: {
  status?: string;
  wktPlaceIdList?: string;
  applyStartDate?: string;
  applyEndDate?: string;
  wktStartDate?: string | null;
  wktEndDate?: string | null;
  pageParam: {
    page: number;
    size: number;
    sort?: string;
  };
}) => {
  return useQuery({
    queryKey: [
      useGetWkListQueryKey,
      status,
      wktPlaceIdList,
      pageParam,
      applyStartDate,
      applyEndDate,
      wktStartDate,
      wktStartDate,
    ],
    queryFn: async () => {
      const res = await api.get(`/api/wkt`, {
        params: {
          status,
          wktPlaceIdList,
          applyStartDate,
          applyEndDate,
          wktStartDate,
          wktEndDate,
          ...pageParam,
        },
      });
      return workationListSchema.parse(res.data.data);
    },
  });
};
