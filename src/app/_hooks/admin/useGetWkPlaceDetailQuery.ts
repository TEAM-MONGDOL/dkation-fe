import { useQuery } from '@tanstack/react-query';
import { wktPlaceDetailShema } from '@/_types/adminType';
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
      return wktPlaceDetailShema.parse(res.data.data);
    },
  });
};
