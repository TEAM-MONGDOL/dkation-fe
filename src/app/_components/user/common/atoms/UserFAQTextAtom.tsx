interface UserFAQTextProps {
  text: string;
  className?: string;
}

const UserFAQText = ({ text, className = '' }: UserFAQTextProps) => {
  return <div className={`text-3 ${className}`}>{text}</div>;
};

export default UserFAQText;
