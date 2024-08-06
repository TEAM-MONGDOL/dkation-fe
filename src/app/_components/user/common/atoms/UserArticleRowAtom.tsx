interface UserArticleRowAtomProps {
  leftTitle: string;
  leftContent: string;
  optionalContent?: string;
}

const UserArticleRowAtom = ({
  leftTitle,
  leftContent,
  optionalContent,
}: UserArticleRowAtomProps) => {
  return (
    <div className="flex h-14 w-full items-center justify-between border-b border-b-sub-100 px-3">
      <div className="flex flex-1 items-center">
        <div className="mr-4 flex items-center">
          <p>{leftTitle}</p>
          <div className="mx-4 h-4 border-l border-l-sub-100" />
          <span>{leftContent}</span>
        </div>
      </div>
      {optionalContent && <div className="ml-4">{optionalContent}</div>}
    </div>
  );
};

export default UserArticleRowAtom;
