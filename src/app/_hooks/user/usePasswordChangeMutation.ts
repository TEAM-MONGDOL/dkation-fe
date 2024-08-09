import { useMutation } from '@tanstack/react-query';
import api from '../Axios';

export const usePasswordChangeMutation = ({
  successCallback,
  errorCallback,
}: {
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: async ({
      accountId,
      password,
    }: {
      accountId: string;
      password: string;
    }) => {
      const response = await api.patch(
        `/api/member`,
        {
          password,
        },
        {
          params: {
            accountId,
          },
        },
      );
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
