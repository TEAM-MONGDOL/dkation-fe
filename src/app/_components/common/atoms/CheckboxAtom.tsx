'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ClickedCheckBox, UnClickedCheckBox } from '@/_assets/icons';

const CheckboxAtom = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleClick = () => {
    setIsChecked((prevChecked) => {
      return !prevChecked;
    });
  };

  return (
    <div onClick={handleClick} className="inline-block" role="presentation">
      <Image
        src={isChecked ? ClickedCheckBox : UnClickedCheckBox}
        alt={isChecked ? 'Checked' : 'Unchecked'}
      />
    </div>
  );
};

export default CheckboxAtom;
