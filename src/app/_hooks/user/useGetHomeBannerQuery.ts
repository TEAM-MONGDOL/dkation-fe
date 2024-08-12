import { bannerInfoListSchema } from '@/_types/adminType';
import { useQuery } from '@tanstack/react-query';
import api from '../Axios';

export const useGetHomeBannerQueryKey = 'useHomeBannerQuery';

export const useGetHomeBannerQuery = () => {
  return useQuery({
    queryKey: [useGetHomeBannerQueryKey],
    queryFn: async () => {
      const response = await api.get('/api/banner');
      return bannerInfoListSchema.parse(response.data.data);
    },
  });
};
