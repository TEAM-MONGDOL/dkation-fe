import Image from 'next/image';
import { CloseIcon, DownloadIcon } from '@/_assets/icons';

interface FileControlButtonAtomProps {
  type: 'delete' | 'download';
  onClick: () => void;
  iconSrc?: string;
}

const FileControlButtonAtom = ({
  type,
  onClick,
  iconSrc,
}: FileControlButtonAtomProps) => {
  return (
    <button type="button" onClick={onClick}>
      {iconSrc ? (
        <Image src={iconSrc} alt={type === 'delete' ? '삭제' : '다운로드'} />
      ) : type === 'delete' ? (
        <Image src={CloseIcon} alt="삭제" />
      ) : (
        <Image src={DownloadIcon} alt="다운로드" />
      )}
    </button>
  );
};

export default FileControlButtonAtom;
