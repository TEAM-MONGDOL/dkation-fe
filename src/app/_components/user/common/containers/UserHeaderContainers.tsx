import UserHeaderTitle from '@/_components/user/common/atoms/UserHeaderTitle';
import UserHeaderContent from '@/_components/user/common/atoms/UserHeaderContent';

interface HeaderProps {
  title: string;
  content: string;
}

const UserHeaderContainers = ({ title, content }: HeaderProps) => {
  return (
    <div className="flex h-[380px] flex-col gap-2 bg-primary px-40 pt-52">
      <UserHeaderTitle title={title} />
      <UserHeaderContent content={content} />
    </div>
  );
};

export default UserHeaderContainers;
