import { useQuery } from '@tanstack/react-query';
import { workationListSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetWkListQueryKey = 'useGetWkListQuery';

export const useGetWkListQuery = ({
  status,
  applyStartDate,
  applyEndDate,
  wktStartDate,
  wktEndDate,
  pageParam,
}: {
  status?: string;
  applyStartDate?: string;
  applyEndDate?: string;
  wktStartDate?: string;
  wktEndDate?: string;
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
