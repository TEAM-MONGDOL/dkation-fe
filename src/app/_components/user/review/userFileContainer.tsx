import React, { useEffect, useState } from 'react';
import DragDropModule from '@/_components/common/modules/DragDropModule';
import { usePostFileMutation } from '@/_hooks/common/usePostFileMutation';
import { CloseIcon, PlusIcon } from '@/_assets/icons';
import Image from 'next/image';

interface FileContainerProps {
  fileUrls: string[];
  onFileChange?: (fileUrls: string[]) => void;
  fileDomainType: string;
  onDeleteFile?: (index: number) => void;
}

const UserFileContainer = ({
  fileUrls: initialFileUrls,
  onFileChange,
  fileDomainType,
  onDeleteFile,
}: FileContainerProps) => {
  const [fileUrls, setFileUrls] = useState<string[]>(initialFileUrls);

  useEffect(() => {
    setFileUrls(initialFileUrls);
  }, [initialFileUrls]);

  const { mutate: postFile } = usePostFileMutation({
    successCallback: (fileInfos: { url: string }[]) => {
      console.log('File upload successful:', fileInfos);
      const newFileUrls = fileInfos.map((file) => file.url);
      setFileUrls((prevFileUrls) => {
        const updatedFileUrls = [...prevFileUrls, ...newFileUrls];
        console.log('File URLs after upload:', updatedFileUrls);
        onFileChange?.(updatedFileUrls);
        return updatedFileUrls;
      });
    },
    errorCallback: (error: Error) => {
      console.error('File upload error:', error);
    },
  });

  const handleFileAdd = (newFiles: File[]) => {
    console.log('Adding new files:', newFiles);
    newFiles.forEach((file) => {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const validExtensions = ['jpg', 'jpeg', 'png'];

      if (!fileExtension || !validExtensions.includes(fileExtension)) {
        alert('이미지 형식의 파일만 업로드할 수 있습니다.');
        return;
      }

      postFile({ file, fileDomainType });
    });
  };

  const handleAddMoreFiles = () => {
    document.getElementById('file-input')?.click();
  };

  const handleDelete = (index: number) => {
    console.log('Requesting delete for index:', index);
    onDeleteFile?.(index);
  };

  return (
    <div className="flex w-full flex-col">
      {fileUrls.length > 0 ? (
        <div className="flex flex-wrap gap-4 rounded-regular border border-dashed border-stroke-100 bg-stroke-100/30 p-4">
          {fileUrls.map((url, index) => (
            <div key={url} className="relative border">
              <Image
                src={url}
                alt="미리보기"
                width={112}
                height={112}
                className="h-28 w-28 rounded-lg object-cover"
              />
              <button
                type="button"
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white"
                onClick={() => handleDelete(index)}
              >
                <Image src={CloseIcon} alt="X" className="h-3 w-3" />
              </button>
            </div>
          ))}
          <button
            type="button"
            className="flex h-28 w-28 items-center justify-center rounded-lg bg-gray-200 text-gray-600"
            onClick={handleAddMoreFiles}
          >
            <Image src={PlusIcon} alt="x" />
          </button>
        </div>
      ) : (
        <DragDropModule user onFileAdd={handleFileAdd} />
      )}

      <input
        id="file-input"
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          console.log('Files selected:', files);
          handleFileAdd(files);
        }}
      />
    </div>
  );
};

export default UserFileContainer;
