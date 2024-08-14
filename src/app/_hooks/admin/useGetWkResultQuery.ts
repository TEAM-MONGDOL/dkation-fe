import { useQuery } from '@tanstack/react-query';
import { WkResultInfoSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetWkResultQueryKey = 'useGetWkResultQuery';

export const useGetWkResultQuery = ({
  wktId,
  status,
  pageParam,
}: {
  wktId: number;
  status?: string;
  pageParam: {
    page: number;
    size: number;
    sort?: string;
  };
}) => {
  return useQuery({
    queryKey: [useGetWkResultQueryKey, wktId, status, pageParam],
    queryFn: async () => {
      const res = await api.get(`/api/wkt/${wktId}/result/member`, {
        params: {
          status,
          ...pageParam,
        },
      });
      return WkResultInfoSchema.parse(res.data.data);
    },
  });
};
