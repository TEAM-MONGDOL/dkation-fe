import { useQuery } from '@tanstack/react-query';
import { pointSupplyListSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetPointSupplyQueryKey = 'usePointSupplyQuery';

export const useGetPointSupplyQuery = ({
  supplyType,
  pointPolicyIds,
  startDate,
  endDate,
  pageParam,
}: {
  supplyType?: string;
  pointPolicyIds?: string;
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
      pointPolicyIds,
      startDate,
      endDate,
      pageParam,
    ],
    queryFn: async () => {
      const res = await api.get(`/api/point/supply`, {
        params: {
          supplyType,
          pointPolicyIds,
          startDate,
          endDate,
          ...pageParam,
        },
      });
      return pointSupplyListSchema.parse(res.data.data);
    },
  });
};
