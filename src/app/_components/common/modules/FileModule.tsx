'use client';

import FileControlButtonAtom from '@/_components/common/atoms/FileControlButtonAtom';
import ImagePreviewAtom from '@/_components/common/atoms/ImagePreviewAtoms';
import FileNameAtom from '@/_components/common/atoms/FileNameAtom';

interface FileModuleProps {
  fileName: string;
  fileType: 'image' | 'other';
  fileUrl: string;
  buttonType: 'delete' | 'edit';
  onDelete?: () => void;
  onEdit?: () => void;
}

const FileModule = ({
  fileName,
  fileType,
  fileUrl,
  buttonType,
  onDelete,
  onEdit,
}: FileModuleProps) => {
  const handleClick = buttonType === 'delete' ? onDelete : onEdit;
  const buttonTypeClass = buttonType === 'delete' ? 'delete' : 'edit';

  return (
    <div className="pr-4 rounded-regular flex items-center bg-[#F4F4f4] border border-stroke-100">
      {fileType === 'image' ? (
        <div className="pl-2.5 py-2">
          <ImagePreviewAtom src={fileUrl} />
        </div>
      ) : (
        ' '
      )}
      <div className={`flex-1 ${fileType === 'image' ? 'pl-10' : 'pl-4 py-4'}`}>
        <FileNameAtom fileName={fileName} />
      </div>
      {handleClick && (
        <FileControlButtonAtom type={buttonTypeClass} onClick={handleClick} />
      )}
    </div>
  );
};

export default FileModule;
