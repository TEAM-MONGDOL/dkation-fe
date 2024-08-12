import Image from 'next/image';

export interface TitleProps {
  title: string;
  headerIcon?: string;
}

const UserHeaderTitle = ({ title, headerIcon }: TitleProps) => {
  return (
    <p className="relative text-h1 font-semibold">
      {title}
      {headerIcon && (
        <Image
          src={headerIcon}
          alt="header-icon"
          className="absolute left-0 top-0 -translate-x-full -translate-y-full"
        />
      )}
    </p>
  );
};

export default UserHeaderTitle;
