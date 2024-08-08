import { useMutation } from '@tanstack/react-query';
import api from '../Axios';

export const usePostCertificationCheck = ({
  successCallback,
  errorCallback,
}: {
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: async (data: { email: string; code: string }) => {
      const response = await api.post('/api/member/certification/check', data);
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
