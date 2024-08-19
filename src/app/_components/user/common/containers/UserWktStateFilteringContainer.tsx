import React from 'react';
import { WktStatusConverter, WktStatusList } from '@/_types/commonType';
import UserFilteringTitleAtom from '@/_components/user/common/atoms/UserFilteringTitleAtom';
import CheckboxModule from '@/_components/common/modules/CheckboxModule';
import UserFilteringSubContainer from './UserFilteringSubContainer';

interface UserWktStateFilteringContainerProps {
  selectedOptions: string[];
  onClickOptions: (options: string[]) => void;
}

const UserWktStateFilteringContainer = ({
  selectedOptions,
  onClickOptions,
}: UserWktStateFilteringContainerProps) => {
  return (
    <UserFilteringSubContainer>
      <UserFilteringTitleAtom text="진행 상태" />
      <div className="flex w-full flex-col gap-y-1.5">
        {WktStatusList.map((option, idx) => {
          return (
            <CheckboxModule
              option={WktStatusConverter[option]}
              isChecked={selectedOptions.includes(option)}
              onClick={() => {
                if (selectedOptions.includes(option)) {
                  onClickOptions(
                    selectedOptions.filter(
                      (selectedOption) => selectedOption !== option,
                    ),
                  );
                } else {
                  onClickOptions([...selectedOptions, option]);
                }
              }}
              key={`userStateFiltering${option}`}
              size={20}
            />
          );
        })}
      </div>
    </UserFilteringSubContainer>
  );
};

export default UserWktStateFilteringContainer;
