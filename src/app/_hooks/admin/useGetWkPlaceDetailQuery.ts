import { useQuery } from '@tanstack/react-query';
import { wktPlaceDetailSchema } from '@/_types/adminType';
import api from '../Axios';

export const useGetWkPlaceDetailQueryKey = 'useGetWkPlaceDetailQuery';

export const useGetWkPlaceDetailQuery = ({
  wktPlaceId,
}: {
  wktPlaceId: number;
}) => {
  return useQuery({
    queryKey: [useGetWkPlaceDetailQueryKey, wktPlaceId],
    queryFn: async () => {
      const res = await api.get(`/api/wkt/place/${wktPlaceId}`, {
        params: {
          wktPlaceId,
        },
      });
      return wktPlaceDetailSchema.parse(res.data.data);
    },
  });
};
