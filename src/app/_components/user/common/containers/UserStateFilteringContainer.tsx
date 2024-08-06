import React from 'react';
import RadioButtonModule from '@/_components/common/modules/RadioButtonModule';
import { WktStatusConverter, WktStatusList } from '@/_types/commonType';
import {
  applyStatusList,
  applyStatusListConverter,
  noticeTypeConverter,
  noticeTypeList,
} from '@/_types/adminType';
import UserFilteringTitleAtom from '@/_components/user/common/atoms/UserFilteringTitleAtom';
import UserFilteringSubContainer from './UserFilteringSubContainer';

interface UserStateFilteringContainerProps {
  type: 'WKT' | 'MYPAGE' | 'NOTICE';
  selectedOption: string;
  onClickOption: (option: string) => void;
}

const UserStateFilteringContainer = ({
  type,
  selectedOption,
  onClickOption,
}: UserStateFilteringContainerProps) => {
  return (
    <UserFilteringSubContainer>
      {type !== 'NOTICE' && <UserFilteringTitleAtom text="진행 상태" />}
      <div className="flex w-full flex-col gap-y-1.5">
        {type === 'WKT'
          ? WktStatusList.map((option, idx) => {
              return (
                <RadioButtonModule
                  option={WktStatusConverter[option]}
                  isClicked={selectedOption === option}
                  onClick={() => onClickOption(option)}
                  key={`userStateFiltering${option}`}
                  size={20}
                />
              );
            })
          : type === 'MYPAGE'
            ? applyStatusList.map((option, idx) => {
                return (
                  <RadioButtonModule
                    option={applyStatusListConverter[option]}
                    isClicked={selectedOption === option}
                    onClick={() => onClickOption(option)}
                    key={`userStateFiltering${option}`}
                    size={20}
                  />
                );
              })
            : noticeTypeList.map((option, idx) => {
                return (
                  <RadioButtonModule
                    option={noticeTypeConverter[option]}
                    isClicked={selectedOption === option}
                    onClick={() => onClickOption(option)}
                    key={`userStateFiltering${option}`}
                    size={20}
                  />
                );
              })}
      </div>
    </UserFilteringSubContainer>
  );
};

export default UserStateFilteringContainer;
