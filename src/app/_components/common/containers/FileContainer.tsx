'use client';

import { useState } from 'react';
import FileModule from '@/_components/common/modules/FileModule';
import DragDropModule from '@/_components/common/modules/DragDropModule';

const FileContainer = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileAdd = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDeleteFile = (fileToDelete: File) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToDelete));
  };

  const getFileType = (file: File): 'image' | 'other' => {
    return file.type.startsWith('image/') ? 'image' : 'other';
  };

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
