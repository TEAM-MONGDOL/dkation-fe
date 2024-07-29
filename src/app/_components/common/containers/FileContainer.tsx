'use client';

import { useEffect, useState } from 'react';
import FileModule from '@/_components/common/modules/FileModule';
import DragDropModule from '@/_components/common/modules/DragDropModule';

interface FileContainerProps {
  onFileChange?: (files: File[]) => void;
}

const FileContainer = ({ onFileChange }: FileContainerProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileAdd = (newFiles: File[]) => {
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, ...newFiles];
      onFileChange?.(updatedFiles);
      return updatedFiles;
    });
  };

  const handleDeleteFile = (fileToDelete: File) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file !== fileToDelete);
      onFileChange?.(updatedFiles);
      return updatedFiles;
    });
  };

  const getFileType = (file: File): 'image' | 'other' => {
    return file.type.startsWith('image/') ? 'image' : 'other';
  };

  useEffect(() => {
    // Clean up
    return () => {
      files.forEach((file) => {
        URL.revokeObjectURL(URL.createObjectURL(file));
      });
    };
  }, [files]);

  return (
    <div className="flex flex-col w-full">
      <DragDropModule onFileAdd={handleFileAdd} />

      <div className="pt-2 flex flex-col gap-1.5">
        {files.map((file, index) => (
          <FileModule
            key={`${file.name}-${file.size}`}
            fileName={file.name}
            fileType={getFileType(file)}
            fileUrl={URL.createObjectURL(file)}
            buttonType="delete"
            onDelete={() => handleDeleteFile(file)}
          />
        ))}
      </div>
    </div>
  );
};

export default FileContainer;
