import React from 'react';
import DragDropModule from '@/_components/common/modules/DragDropModule';
import { usePostFileMutation } from '@/_hooks/common/usePostFileMutation';

interface FileInfo {
  url: string;
  fileName: string;
}

interface FileContainerProps {
  onFileChange?: (fileInfos: FileInfo[]) => void;
  fileDomainType: string;
}

const FileContainer = ({
  onFileChange,
  fileDomainType,
}: FileContainerProps) => {
  const { mutate: postFile } = usePostFileMutation({
    successCallback: (fileInfos: FileInfo[]) => {
      onFileChange?.(fileInfos);
    },
    errorCallback: (error: Error) => {
      console.error('Error uploading file:', error);
    },
  });

  const handleFileAdd = (newFiles: File[]) => {
    newFiles.forEach((file) => {
      postFile({ file, fileDomainType });
    });
  };

  return (
    <div className="flex w-full flex-col">
      <DragDropModule onFileAdd={handleFileAdd} />
    </div>
  );
};

export default FileContainer;
