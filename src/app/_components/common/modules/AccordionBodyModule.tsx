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
      className={`w-full transition-max-height duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
    >
      <div className="w-full flex flex-col items-start justify-start gap-y-1.5 px-3 mt-1.5 pb-2">
        {children}
      </div>
    </div>
  );
};

export default AccordionBodyModule;
