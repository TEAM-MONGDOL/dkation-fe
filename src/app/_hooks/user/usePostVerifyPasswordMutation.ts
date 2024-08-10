import { useMutation } from '@tanstack/react-query';
import api from '../Axios';

export const usePostVerifyPasswordMutation = ({
  successCallback,
  errorCallback,
}: {
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: async (data: { password: string }) => {
      const response = await api.post('/api/member/password/check', data);
      return response.data;
    },
    onSuccess: () => {
      successCallback && successCallback();
    },
    onError: (error: Error) => {
      errorCallback && errorCallback(error);
    },
  });
};
