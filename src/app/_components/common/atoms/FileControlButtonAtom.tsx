import Image from 'next/image';
import { Delete, Download } from '@/_assets/icons';

interface FileControlButtonAtomProps {
  type: 'delete' | 'download';
  onClick: () => void;
}

const FileControlButtonAtom = ({
  type,
  onClick,
}: FileControlButtonAtomProps) => {
  return (
    <button onClick={onClick}>
      {type === 'delete' ? (
        <Image src={Delete} alt="삭제" />
      ) : (
        <Image src={Download} alt="다운로드" />
      )}
    </button>
  );
};

export default FileControlButtonAtom;
