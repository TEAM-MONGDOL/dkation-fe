import HeaderTitle from '@/_components/user/common/atoms/HeaderTitle';
import HeaderContent from '@/_components/user/common/atoms/HeaderContent';

interface HeaderProps {
  title: string;
  content: string;
}

const HeaderContainers = ({ title, content }: HeaderProps) => {
  return (
    <div className="flex h-[380px] flex-col gap-2 bg-primary px-48 pt-52">
      <HeaderTitle title={title} />
      <HeaderContent content={content} />
    </div>
  );
};

export default HeaderContainers;
