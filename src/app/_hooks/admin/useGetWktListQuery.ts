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
  applyStartDate?: Date;
  applyEndDate?: Date;
  wktStartDate?: Date;
  wktEndDate?: Date;
  pageParam: {
    page: number;
    size: number;
    sort?: string;
  };
}) => {
  return useQuery({
    queryKey: [
      useGetWkListQueryKey,
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
