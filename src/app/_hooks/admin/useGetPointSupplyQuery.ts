import { useQuery } from '@tanstack/react-query';
import { pointSupplyListSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetPointSupplyQueryKey = 'usePointSupplyQuery';

export const useGetPointSupplyQuery = ({
  supplyType,
  pointTitle,
  startDate,
  endDate,
  pageParam,
}: {
  supplyType?: string;
  pointTitle?: string;
  startDate?: string;
  endDate?: string;
  pageParam: {
    page: number;
    size: number;
    sort?: string;
  };
}) => {
  return useQuery({
    queryKey: [
      useGetPointSupplyQueryKey,
      supplyType,
      pointTitle,
      startDate,
      endDate,
      pageParam,
    ],
    queryFn: async () => {
      const res = await api.get(`/api/point/supply`, {
        params: {
          supplyType,
          pointTitle,
          startDate,
          endDate,
          ...pageParam,
        },
      });
      return pointSupplyListSchema.parse(res.data.data);
    },
  });
};
