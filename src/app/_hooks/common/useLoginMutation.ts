import { useMutation } from '@tanstack/react-query';
import useAuthStore from '@/_stores/useAuthStore';
import api from '../Axios';

export const useLoginMutation = ({
  successCallback,
  errorCallback,
}: {
  successCallback?: (data: any) => void;
  errorCallback?: (error: Error) => void;
}) => {
  const { login } = useAuthStore();
  return useMutation({
    mutationFn: async (request: { accountId: string; password: string }) => {
      const response = await api.post('/api/auth/login', request);
      return response.data;
    },
    onSuccess: (data) => {
      const result = data.data;
      login(result.accessToken, result.accountId);
      successCallback && successCallback(data);
    },
    onError: (error: Error) => {
      errorCallback && errorCallback(error);
    },
  });
};
