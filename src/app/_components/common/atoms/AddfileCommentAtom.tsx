interface AddFIleCommentAtomProps {
  comment: string;
  subComment: string;
}

const AddFIleCommentAtom = ({
  comment,
  subComment,
}: AddFIleCommentAtomProps) => {
  return (
    <div className="text-center text-4 text-sub-200">
      <p>{comment}</p>
      <p>{subComment}</p>
    </div>
  );
};

export default AddFIleCommentAtom;
