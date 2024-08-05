import { useQuery } from '@tanstack/react-query';
import { pointSupplyDetailSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetPointSupplyDetailQueryKey = 'useGetPointSupplyDetailQuery';

export const useGetPointSupplyDetailQuery = ({
  supplyId,
}: {
  supplyId: number;
}) => {
  return useQuery({
    queryKey: [useGetPointSupplyDetailQueryKey],
    queryFn: async () => {
      const res = await api.get(`/api/point/supply/${supplyId}`);
      return pointSupplyDetailSchema.parse(res.data.data);
    },
  });
};
