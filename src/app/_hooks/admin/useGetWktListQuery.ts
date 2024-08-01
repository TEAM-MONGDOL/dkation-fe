import { useQuery } from '@tanstack/react-query';
import {
  wktStatusList,
  WktStatusType,
  workationListSchema,
} from '@/_types/adminType';
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
  status?: WktStatusType;
  applyStartDate?: Date;
  applyEndDate?: Date;
  wktStartDate?: Date;
  wktEndDate?: Date;
  pageParam: {
    page: number;
    size: number;
    // sort?: string;
  };
}) => {
  return useQuery({
    queryKey: [useGetWkListQueryKey],
    queryFn: async () => {
      const res = await api.get(`/api/wkt`, {
        params: {
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
