import React from 'react';
import DragDropModule from '@/_components/common/modules/DragDropModule';
import { usePostFileMutation } from '@/_hooks/common/usePostFileMutation';

interface FileInfo {
  url: string;
  fileName: string;
}

interface FileContainerProps {
  onFileChange?: (fileInfos: FileInfo[]) => void;
  fileDomainType: 'ANNOUNCEMENT' | 'POINT_APPLY';
  maxFileCount?: number;
}

const FileContainer = ({
  onFileChange,
  fileDomainType,
  maxFileCount,
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
    if (maxFileCount && newFiles.length > maxFileCount) {
      console.error(`최대 ${maxFileCount}개까지 업로드 가능합니다.`);
      return;
    }

    newFiles.forEach((file) => {
      postFile({ file, fileDomainType });
    });
  };

  return (
    <div className="flex w-full flex-col">
      <DragDropModule
        onFileAdd={handleFileAdd}
        maxFileCount={maxFileCount}
        fileDomainType={fileDomainType}
      />
    </div>
  );
};

export default FileContainer;
