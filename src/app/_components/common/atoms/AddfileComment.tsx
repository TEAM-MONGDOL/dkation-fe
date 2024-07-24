interface AddFIleCommentAtomProps {
  comment: string;
  subComment: string;
}

const AddFIleCommentAtom = ({
  comment,
  subComment,
}: AddFIleCommentAtomProps) => {
  return (
    <div className="text-center text-sub-200 text-4">
      <p>{comment}</p>
      <p>{subComment}</p>
    </div>
  );
};

export default AddFIleCommentAtom;
