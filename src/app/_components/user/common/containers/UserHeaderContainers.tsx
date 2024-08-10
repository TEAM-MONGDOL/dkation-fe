import UserHeaderTitle from '@/_components/user/common/atoms/UserHeaderTitle';
import UserHeaderContent from '@/_components/user/common/atoms/UserHeaderContent';

interface HeaderProps {
  title: string;
  content: string;
  img?: string;
  headerIcon?: string;
}

const UserHeaderContainers = ({
  title,
  content,
  img,
  headerIcon,
}: HeaderProps) => {
  return (
    <div
      className={`flex h-[380px] flex-col gap-2 bg-primary px-40 pt-52 ${img && `${img} bg-cover bg-center bg-no-repeat`}`}
    >
      <UserHeaderTitle title={title} headerIcon={headerIcon} />
      <UserHeaderContent content={content} />
    </div>
  );
};

export default UserHeaderContainers;
