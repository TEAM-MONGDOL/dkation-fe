export interface ContentProps {
  content: string;
}

const UserHeaderContent = ({ content }: ContentProps) => {
  return <p className="text-2">{content}</p>;
};

export default UserHeaderContent;
