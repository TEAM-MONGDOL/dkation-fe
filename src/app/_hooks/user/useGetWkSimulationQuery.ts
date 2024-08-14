import { useQuery } from '@tanstack/react-query';
import { workationRaffleSchema } from '@/_types/userType';
import api from '../Axios';

export const useGetWkSimulationQuery = ({ wktId }: { wktId: number }) => {
  return useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await api.get(`/api/wkt/${wktId}/simulation`);
      return workationRaffleSchema.parse(res.data.data);
    },
  });
};
