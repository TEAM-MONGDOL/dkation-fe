import { useEffect, useState } from 'react';
import FileModule from '@/_components/common/modules/FileModule';
import DragDropModule from '@/_components/common/modules/DragDropModule';
import { usePostFileMutation } from '@/_hooks/common/usePostFileMutation';

interface FileContainerProps {
  onFileChange?: (fileUrls: string[]) => void;
  fileDomainType: string;
}

const FileContainer = ({
  onFileChange,
  fileDomainType,
}: FileContainerProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFileUrls, setUploadedFileUrls] = useState<string[]>([]);

  const { mutate: postFile } = usePostFileMutation({
    successCallback: (fileUrls: string[]) => {
      setUploadedFileUrls((prevUrls) => {
        const updatedUrls = [...prevUrls, ...fileUrls];
        onFileChange?.(updatedUrls);
        return updatedUrls;
      });
    },
    errorCallback: (error: Error) => {
      console.error('Error uploading file :', error);
    },
  });

  const handleFileAdd = (newFiles: File[]) => {
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, ...newFiles];
      const newFileUrls = newFiles.map((file) => URL.createObjectURL(file));
      onFileChange?.([...uploadedFileUrls, ...newFileUrls]);

      newFiles.forEach((file) => {
        postFile({ file, fileDomainType });
      });

      return updatedFiles;
    });
  };

  const handleDeleteFile = (index: number) => {
    setUploadedFileUrls((prevUrls) => {
      const updatedUrls = prevUrls.filter((_, idx) => idx !== index);
      onFileChange?.(updatedUrls);

      return updatedUrls;
    });

    setFiles((prevFiles) => {
      return prevFiles.filter((_, idx) => idx !== index);
    });
  };

  const getFileType = (file: File): 'image' | 'other' => {
    return file.type.startsWith('image/') ? 'image' : 'other';
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        URL.revokeObjectURL(URL.createObjectURL(file));
      });
    };
  }, [files]);

  return (
    <div className="flex w-full flex-col">
      <DragDropModule onFileAdd={handleFileAdd} />

      <div className="flex flex-col gap-1.5 pt-2">
        {files.map((file, index) => (
          <FileModule
            key={`${file.name}-${file.size}`}
            fileName={file.name}
            fileType={getFileType(file)}
            preview={URL.createObjectURL(file)}
            buttonType="delete"
            onDelete={() => handleDeleteFile(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FileContainer;
