import InfoContentAtom from '@/_components/common/atoms/InfoContentAtom';

interface InfoSectionModuleProps {
  isStartAlign?: boolean;
  data: { subtitle: string; content: string }[];
}
const InfoSectionModule = ({
  data,
  isStartAlign = true,
}: InfoSectionModuleProps) => {
  return (
    <div className="flex flex-col gap-5 px-5">
      {data.map((item, index) => (
        <InfoContentAtom
          key={`data-${item}`}
          data={item}
          isStartAlign={isStartAlign}
        />
      ))}
    </div>
  );
};

export default InfoSectionModule;
