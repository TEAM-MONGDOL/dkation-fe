import Image from 'next/image';
import { DownloadIcon, CloseIcon } from '@/_assets/icons';

interface FileControlButtonAtomProps {
  type: 'delete' | 'download';
  onClick: () => void;
}

const FileControlButtonAtom = ({
  type,
  onClick,
}: FileControlButtonAtomProps) => {
  return (
    <button type="button" onClick={onClick}>
      {type === 'delete' ? (
        <Image src={CloseIcon} alt="삭제" />
      ) : (
        <Image src={DownloadIcon} alt="다운로드" />
      )}
    </button>
  );
};

export default FileControlButtonAtom;
