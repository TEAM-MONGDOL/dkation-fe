import { useMutation } from '@tanstack/react-query';
import api from '../Axios';

interface FilePostRequest {
  file: File;
  fileDomainType: string;
}

export const usePostFileMutation = ({
  successCallback,
  errorCallback,
}: {
  successCallback?: (fileUrls: string[]) => void;
  errorCallback?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: async (request: FilePostRequest) => {
      const formData = new FormData();
      formData.append('files', request.file);
      formData.append('fileDomainType', request.fileDomainType);

      const response = await api.post('/api/file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    },
    onSuccess: (data) => {
      if (successCallback) {
        successCallback(data.data.fileUrls);
      }
    },
    onError: (error: Error) => {
      if (errorCallback) {
        errorCallback(error);
      }
    },
  });
};
