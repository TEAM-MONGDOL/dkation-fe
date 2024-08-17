interface AccordionBodyModuleProps {
  isExpanded: boolean;
  children: React.ReactNode;
}

const AccordionBodyModule = ({
  isExpanded,
  children,
}: AccordionBodyModuleProps) => {
  return (
    <div
      className={`transition-max-height w-full overflow-hidden duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-y-auto`}
    >
      <div className="mt-1.5 flex w-full flex-col items-start justify-start gap-y-1.5 px-3 pb-2">
        {children}
      </div>
    </div>
  );
};

export default AccordionBodyModule;
