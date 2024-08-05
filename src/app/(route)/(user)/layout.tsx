import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const layout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default layout;
