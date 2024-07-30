import Link from 'next/link';

interface SubTitleProps {
  content: string | undefined;
  route: string;
}
const NavSubAtom = ({ content, route }: SubTitleProps) => {
  return (
    <Link href={route}>
      <p className="font-light py-1.5 ml-[29px] text-4">{content}</p>
    </Link>
  );
};

export default NavSubAtom;
