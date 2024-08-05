export interface ContentProps {
  content: string;
}

const HeaderContent = ({ content }: ContentProps) => {
  return <p className="text-2">{content}</p>;
};

export default HeaderContent;
