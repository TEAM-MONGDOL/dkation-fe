import { useMutation } from '@tanstack/react-query';
import api from '../Axios';

export const useLoginMutation = ({
  successCallback,
  errorCallback,
}: {
  successCallback?: (data: any) => void;
  errorCallback?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: async (request: { accountId: string; password: string }) => {
      const response = await api.post('/api/auth/login', request);
      return response.data;
    },
    onSuccess: (data) => {
      successCallback && successCallback(data);
    },
    onError: (error: Error) => {
      errorCallback && errorCallback(error);
    },
  });
};
