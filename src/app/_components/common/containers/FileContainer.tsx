import React from 'react';
import DragDropModule from '@/_components/common/modules/DragDropModule';
import { usePostFileMutation } from '@/_hooks/common/usePostFileMutation';

interface FileInfo {
  url: string;
  fileName: string;
}

interface FileContainerProps {
  onFileChange?: (fileInfos: FileInfo[]) => void;
  fileDomainType: 'ANNOUNCEMENT' | 'POINT_APPLY' | 'WKT_PLACE';
  maxFileCount?: number;
  maxFileSizeMB?: number;
  existingFiles?: FileInfo[];
}

const FileContainer = ({
  onFileChange,
  fileDomainType,
  maxFileCount,
  maxFileSizeMB,
  existingFiles = [],
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
    const totalFileCount = existingFiles.length + newFiles.length;

    // 파일 개수 확인
    if (maxFileCount && totalFileCount > maxFileCount) {
      const message = `파일은 최대 ${maxFileCount}개까지 업로드 가능합니다.`;
      console.error(message);
      alert(message);
      return;
    }

    // 파일 크기 확인
    if (maxFileSizeMB !== undefined) {
      const invalidFiles = newFiles.filter(
        (file) => file.size > maxFileSizeMB * 1024 * 1024,
      );
      if (invalidFiles.length > 0) {
        const message = `파일은 최대 ${maxFileSizeMB}MB까지 업로드 가능합니다.`;
        console.error(message);
        alert(message);
        return;
      }
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
