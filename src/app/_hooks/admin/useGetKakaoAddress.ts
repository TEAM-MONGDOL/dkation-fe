import { KakaoPlaceSchema } from '@/_types/commonType';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetKakaoAdddress = ({ address }: { address: string }) => {
  return useQuery({
    queryKey: ['getKakaoAddress', address],
    queryFn: async () => {
      const response = await axios.get(
        'https://dapi.kakao.com/v2/local/search/address.json',
        {
          params: {
            query: address,
            analyze_type: 'exact',
          },
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
          },
        },
      );
      return KakaoPlaceSchema.parse(response.data);
    },
    enabled: !!address,
  });
};
