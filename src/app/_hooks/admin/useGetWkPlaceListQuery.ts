import { useQuery } from '@tanstack/react-query';
import { workationPlaceListSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetWkPlaceListQueryKey = 'useGetWkPlaceListQuery';
export const useGetWkPlaceListQuery = ({
  pageParam,
}: {
  pageParam: {
    page: number;
    size: number;
  };
}) => {
  return useQuery({
    queryKey: [useGetWkPlaceListQueryKey, pageParam],
    queryFn: async () => {
      const res = await api.get(`/api/wkt/place`, {
        params: {
          ...pageParam,
        },
      });
      return workationPlaceListSchema.parse(res.data.data);
    },
    refetchOnMount: true,
  });
};
