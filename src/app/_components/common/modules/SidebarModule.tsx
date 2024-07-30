import React from 'react';
import SidebarAtom from '@/_components/common/atoms/SidebarAtom';

interface SidebarModuleProps {
  items: { id: string; title: string; url: string }[];
}

const SidebarModule = ({ items }: SidebarModuleProps) => {
  return (
    <div className="flex w-full flex-col rounded-regular border border-stroke-100 bg-white">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={` ${index < items.length - 1 ? 'border-b border-b-stroke-100' : ''}`}
        >
          <SidebarAtom title={item.title} to={item.url} />
        </div>
      ))}
    </div>
  );
};

export default SidebarModule;
