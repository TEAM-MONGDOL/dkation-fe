'use client';

import FileControlButtonAtom from '@/_components/common/atoms/FileControlButtonAtom';
import ImagePreviewAtom from '@/_components/common/atoms/ImagePreviewAtoms';
import FileNameAtom from '@/_components/common/atoms/FileNameAtom';
import { UserDownloadIcon } from '@/_assets/icons';

interface FileModuleProps {
  fileName: string;
  fileType: 'image' | 'other';
  preview: string;
  buttonType: 'delete' | 'download';
  onDelete?: () => void;
  onDownload?: () => void;
  isUser?: boolean;
}

const FileModule = ({
  fileName,
  fileType,
  preview,
  buttonType,
  onDelete,
  onDownload,
  isUser = false,
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
    <div
      className={`flex w-full items-center rounded-regular border border-stroke-100 ${
        isUser ? 'border-0 bg-sub-100/30' : 'bg-cus-100'
      } pr-4`}
    >
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
      <div className={isUser ? 'px-2' : ''}>
        <FileControlButtonAtom
          type={buttonTypeClass}
          onClick={handleClick}
          iconSrc={
            isUser && buttonType === 'download' ? UserDownloadIcon : undefined
          }
        />
      </div>
    </div>
  );
};

export default FileModule;
