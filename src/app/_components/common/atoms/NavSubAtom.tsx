import Link from 'next/link';

interface SubTitleProps {
  content: string | undefined;
  route: string;
}
const NavSubAtom = ({ content, route }: SubTitleProps) => {
  return (
    <Link href={route}>
      <p className="px-10 py-1.5 text-4 font-medium">{content}</p>
    </Link>
  );
};

export default NavSubAtom;
