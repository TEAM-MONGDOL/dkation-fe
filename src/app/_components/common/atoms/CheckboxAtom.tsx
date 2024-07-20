import React, { useState } from 'react';
import Image from 'next/image';
import { ClickedCheckBox, UnClickedCheckBox } from '@/_assets/icons';

const CheckboxAtom: React.FC = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleClick = () => {
    setIsChecked((prevChecked) => {
      const newCheckedState = !prevChecked;
      console.log(newCheckedState ? 'Checked' : 'Unchecked!');
      return newCheckedState;
    });
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div onClick={handleClick} style={{ display: 'inline-block' }}>
      <Image
        src={isChecked ? ClickedCheckBox : UnClickedCheckBox}
        alt={isChecked ? 'Checked' : 'Unchecked'}
      />
    </div>
  );
};

export default CheckboxAtom;
