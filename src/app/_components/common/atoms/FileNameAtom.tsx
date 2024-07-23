interface FileNameProps {
  fileName: string;
}

const FileNameAtom = ({ fileName }: FileNameProps) => {
  return <p className="text-3">{fileName}</p>;
};

export default FileNameAtom;
