'use client';

import { useRef, useState } from 'react';
import AddFIleCommentAtom from '@/_components/common/atoms/AddfileCommentAtom';
import AddFIleButtonAtom from '@/_components/common/atoms/AddfileButtonAtom';
import { DragDropContent } from '@/_constants/common';

interface DragDropModuleProps {
  onFileAdd: (files: File[]) => void;
  maxFileCount?: number;
  fileDomainType?: 'ANNOUNCEMENT' | 'POINT_APPLY';
}

const DragDropModule = ({
  onFileAdd,
  maxFileCount,
  fileDomainType,
}: DragDropModuleProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLLabelElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (maxFileCount && e.dataTransfer.files.length > maxFileCount) {
        console.error(`최대 ${maxFileCount}개까지 업로드 가능합니다.`);
        return;
      }

      onFileAdd(Array.from(e.dataTransfer.files));
      e.dataTransfer.clearData();
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (
      selectedFiles?.length &&
      maxFileCount &&
      selectedFiles.length > maxFileCount
    ) {
      console.error(`최대 ${maxFileCount}개까지 업로드 가능합니다.`);
      return;
    }

    if (selectedFiles) {
      onFileAdd(Array.from(selectedFiles));
    }
  };

  return (
    <div className="flex w-full flex-col gap-2.5">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        className={`flex w-full cursor-pointer flex-col items-center justify-center gap-2.5 rounded-regular border border-dashed p-5 ${
          isDragging ? 'border-primary bg-primary/20' : 'border-stroke-100'
        }`}
        htmlFor="fileUpload"
        ref={dragRef}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          id="fileUpload"
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple={maxFileCount ? maxFileCount > 1 : true}
        />

        <AddFIleButtonAtom onClick={handleButtonClick} />
        <AddFIleCommentAtom
          comment={DragDropContent.COMMENT}
          subComment={
            fileDomainType
              ? DragDropContent.SUB_COMMENT[fileDomainType]
              : DragDropContent.SUB_COMMENT.ANNOUNCEMENT
          }
        />
      </label>
    </div>
  );
};

export default DragDropModule;
