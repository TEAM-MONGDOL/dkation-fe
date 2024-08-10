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

  const { mutate: postFile } = usePostFileMutation({
    successCallback: (fileInfos: { url: string }[]) => {
      const newFileUrls = fileInfos.map((file) => file.url);
      const updatedFileUrls = [...fileUrls, ...newFileUrls];
      setFileUrls(updatedFileUrls);
      onFileChange?.(updatedFileUrls);
    },
    errorCallback: (error: Error) => {
      console.error('파일 업로드 중 오류 발생:', error);
    },
  });

  useEffect(() => {
    setFileUrls(initialFileUrls);
  }, [initialFileUrls]);

  const handleFileAdd = (newFiles: File[]) => {
    newFiles.forEach((file) => {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];

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
    const updatedFileUrls = fileUrls.filter((_, idx) => idx !== index);
    setFileUrls(updatedFileUrls);
    onDeleteFile?.(index); // 상위 컴포넌트에 삭제 알림
    onFileChange?.(updatedFileUrls); // 상위 컴포넌트에 변경 사항 알림
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
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white"
                onClick={() => handleDelete(index)} // 인덱스를 사용하여 삭제
              >
                <Image src={CloseIcon} alt="X" className="h-3 w-3" />
              </button>
            </div>
          ))}
          <button
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
          handleFileAdd(files);
        }}
      />
    </div>
  );
};

export default UserFileContainer;
