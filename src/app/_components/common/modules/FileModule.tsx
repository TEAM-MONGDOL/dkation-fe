'use client';

import FileControlButtonAtom from '@/_components/common/atoms/FileControlButtonAtom';
import ImagePreviewAtom from '@/_components/common/atoms/ImagePreviewAtoms';
import FileNameAtom from '@/_components/common/atoms/FileNameAtom';

interface FileModuleProps {
  fileName: string;
  fileType: 'image' | 'other';
  fileUrl: string;
  buttonType: 'delete' | 'download';
  onDelete?: () => void;
  onDownload?: () => void;
}

const FileModule = ({
  fileName,
  fileType,
  fileUrl,
  buttonType,
  onDelete,
  onDownload,
}: FileModuleProps) => {
  const handleClick = buttonType === 'delete' ? onDelete : onDownload;
  const buttonTypeClass = buttonType === 'delete' ? 'delete' : 'download';

  return (
    <div className="flex items-center rounded-regular border border-stroke-100 bg-[#F4F4f4] pr-4">
      {fileType === 'image' ? (
        <div className="py-2 pl-2.5">
          <ImagePreviewAtom src={fileUrl} />
        </div>
      ) : (
        ' '
      )}
      <div className={`flex-1 ${fileType === 'image' ? 'pl-10' : 'py-4 pl-4'}`}>
        <FileNameAtom fileName={fileName} />
      </div>
      {handleClick && (
        <FileControlButtonAtom type={buttonTypeClass} onClick={handleClick} />
      )}
    </div>
  );
};

export default FileModule;
