import UserTabBarAtom from '../atoms/UserTabBarAtom';

interface UserTabBarModuleProps {
  tabs: { text: string; isActive: boolean; onClick: () => void }[];
}

const UserTabBarModule = ({ tabs }: UserTabBarModuleProps) => {
  return (
    <div className="flex h-[70px] w-full items-center gap-x-6xl border-b-[0.5px] border-sub-100 px-40 shadow-[0_1.5px_3px_0_rgba(0,0,0,0.2)]">
      {tabs.map((tab, index) => (
        <UserTabBarAtom
          key={tab.text}
          text={tab.text}
          isActive={tab.isActive}
          onClick={tab.onClick}
        />
      ))}
    </div>
  );
};

export default UserTabBarModule;
