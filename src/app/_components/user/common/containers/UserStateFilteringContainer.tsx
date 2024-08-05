import React from 'react';
import UserFilteringTitleAtom from '../atoms/UserFilteringTitleAtom';
import RadioButtonModule from '@/_components/common/modules/RadioButtonModule';
import { WktStatusConverter, WktStatusList } from '@/_types/commonType';
import { applyStatusList, applyStatusListConverter } from '@/_types/adminType';

interface UserStateFilteringContainerProps {
  type: 'WKT' | 'MYPAGE';
  selectedOption: string;
  onClickOption: (option: string) => void;
}

const UserStateFilteringContainer = ({
  type,
  selectedOption,
  onClickOption,
}: UserStateFilteringContainerProps) => {
  return (
    <div className="flex w-full flex-col gap-y-6 border-t-[0.5px] border-sub-100 px-8 pb-9 pt-7">
      <UserFilteringTitleAtom text="진행 상태" />
      <div className="flex w-full flex-col gap-y-1.5">
        {type === 'WKT'
          ? WktStatusList.map((option, idx) => {
              return (
                <RadioButtonModule
                  option={WktStatusConverter[option]}
                  isClicked={selectedOption === option}
                  onClick={() => onClickOption(option)}
                  key={'userStateFiltering' + option}
                  size={20}
                />
              );
            })
          : applyStatusList.map((option, idx) => {
              return (
                <RadioButtonModule
                  option={applyStatusListConverter[option]}
                  isClicked={selectedOption === option}
                  onClick={() => onClickOption(option)}
                  key={'userStateFiltering' + option}
                  size={20}
                />
              );
            })}
      </div>
    </div>
  );
};

export default UserStateFilteringContainer;
