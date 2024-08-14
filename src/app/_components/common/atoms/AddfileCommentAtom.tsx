interface AddFileCommentAtomProps {
  comment: string;
  subComment: string;
  user?: boolean;
}

const AddFileCommentAtom = ({
  comment,
  subComment,
  user = false,
}: AddFileCommentAtomProps) => {
  return (
    <div
      className={`text-center text-4 ${user ? 'text-black' : 'text-sub-200'}`}
    >
      <p>{comment}</p>
      <p>{subComment}</p>
    </div>
  );
};

export default AddFileCommentAtom;
