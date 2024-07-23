import React from 'react';
import SidebarAtom from '@/_components/common/atoms/SidebarAtom';

interface SidebarModuleProps {
  items: { id: string; title: string; url: string }[];
}

const SidebarModule = ({ items }: SidebarModuleProps) => {
  return (
    <div className="flex flex-col w-full bg-white border border-stroke-100 rounded-regular">
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
