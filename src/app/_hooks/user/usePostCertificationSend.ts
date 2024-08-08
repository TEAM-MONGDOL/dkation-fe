import { useMutation } from '@tanstack/react-query';
import api from '../Axios';

export const usePostCertificationSend = ({
  successCallback,
  errorCallback,
}: {
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: async (data: { email: string }) => {
      const response = await api.post('/api/member/certification/send', data);
      return response.data.data;
    },
    onSuccess: () => {
      successCallback && successCallback();
    },
    onError: (error) => {
      errorCallback && errorCallback(error);
    },
  });
};
