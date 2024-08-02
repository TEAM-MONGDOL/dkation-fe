'use client';

import FileControlButtonAtom from '@/_components/common/atoms/FileControlButtonAtom';
import ImagePreviewAtom from '@/_components/common/atoms/ImagePreviewAtoms';
import FileNameAtom from '@/_components/common/atoms/FileNameAtom';

interface FileModuleProps {
  fileName: string;
  fileType: 'image' | 'other';
  preview: string;
  buttonType: 'delete' | 'download';
  onDelete?: () => void;
  onDownload?: () => void;
}

const FileModule = ({
  fileName,
  fileType,
  preview,
  buttonType,
  onDelete,
  onDownload,
}: FileModuleProps) => {
  const handleClick = () => {
    if (buttonType === 'download') {
      const link = document.createElement('a');
      link.href = preview;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (onDownload) {
        onDownload();
      }
    } else if (buttonType === 'delete' && onDelete) {
      onDelete();
    }
  };

  const buttonTypeClass = buttonType === 'delete' ? 'delete' : 'download';

  return (
    <div className="flex w-full items-center rounded-regular border border-stroke-100 bg-[#F4F4f4] pr-4">
      {fileType === 'image' ? (
        <div className="py-2 pl-2.5">
          <ImagePreviewAtom src={preview} />
        </div>
      ) : (
        ' '
      )}

      <div className={`flex-1 ${fileType === 'image' ? 'pl-10' : 'py-4 pl-4'}`}>
        <FileNameAtom fileName={fileName} />
      </div>
      <FileControlButtonAtom type={buttonTypeClass} onClick={handleClick} />
    </div>
  );
};

export default FileModule;
