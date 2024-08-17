import { useQuery } from '@tanstack/react-query';
import { pointSupplyDetailSchema } from '@/_types/adminType';
import api from '../Axios';

export const getPointSupplyDetailQueryKey = (id: string) =>
  `useGetPointSupplyDetailQuery-${id}`;

export const useGetPointSupplyDetailQuery = ({
  supplyId,
  pageable: { page, size },
}: {
  supplyId: number;
  pageable: {
    page: number;
    size: number;
  };
}) => {
  return useQuery({
    queryKey: [getPointSupplyDetailQueryKey(supplyId.toString()), page, size],
    queryFn: async () => {
      const res = await api.get(`/api/point/supply/${supplyId}`, {
        params: {
          page,
          size,
        },
      });
      return pointSupplyDetailSchema.parse(res.data.data);
    },
  });
};
