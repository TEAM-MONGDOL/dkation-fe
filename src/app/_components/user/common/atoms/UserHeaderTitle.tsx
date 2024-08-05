export interface TitleProps {
  title: string;
}

const UserHeaderTitle = ({ title }: TitleProps) => {
  return <p className="text-h1 font-semibold">{title}</p>;
};

export default UserHeaderTitle;
