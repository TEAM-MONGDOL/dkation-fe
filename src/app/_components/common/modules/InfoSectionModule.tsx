import InfoContentAtom from '@/_components/common/atoms/InfoContentAtom';

interface InfoSectionModuleProps {
  data: { subtitle: string; content: string }[];
}
const InfoSectionModule = ({ data }: InfoSectionModuleProps) => {
  return (
    <div className="flex flex-col gap-5">
      {data.map((item, index) => (
        <InfoContentAtom key={`data-${item}`} data={item} />
      ))}
    </div>
  );
};

export default InfoSectionModule;
