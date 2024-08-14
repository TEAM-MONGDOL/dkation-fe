interface UserTextLabelAtomProps {
  text: string;
  className?: string;
  size: 'sm' | 'md' | 'lg' | 'fix';
}

const UserTextLabelAtom = ({
  text,
  className = '',
  size,
}: UserTextLabelAtomProps) => {
  const sizeClasses = {
    sm: 'px-3.5 py-1',
    md: 'px-5 py-2',
    lg: 'px-5 py-2.5',
    fix: 'w-24 py-1',
  };

  return (
    <p
      className={`flex items-center justify-center rounded-full ${sizeClasses[size]} ${className}`}
    >
      {text}
    </p>
  );
};

export default UserTextLabelAtom;
