'use client';

import { useRef, useState } from 'react';
import AddFIleCommentAtom from '@/_components/common/atoms/AddfileCommentAtom';
import AddFIleButtonAtom from '@/_components/common/atoms/AddfileButtonAtom';
import { DragDropContent } from '@/_constants/common';

interface DragDropModuleProps {
  onFileAdd: (files: File[]) => void;
}

const DragDropModule = ({ onFileAdd }: DragDropModuleProps) => {
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
    if (selectedFiles) {
      onFileAdd(Array.from(selectedFiles));
    }
  };

  return (
    <div className="flex flex-col w-full gap-2.5">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        className={`flex flex-col w-full gap-2.5 p-5 border border-dashed rounded-regular items-center justify-center cursor-pointer ${
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
          multiple
        />
        <AddFIleButtonAtom onClick={handleButtonClick} />
        <AddFIleCommentAtom
          comment={DragDropContent.COMMENT}
          subComment={DragDropContent.SUBCOMMENT}
        />
      </label>
    </div>
  );
};

export default DragDropModule;
