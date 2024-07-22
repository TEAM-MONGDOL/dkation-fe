'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ClickedRadioButton, UnClickedRadioButton } from '@/_assets/icons';

const RadioButtonAtom = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleClick = () => {
    setIsChecked((prevChecked) => {
      return !prevChecked;
    });
  };

  return (
    <div onClick={handleClick} className="inline-block" role="presentation">
      <Image
        src={isChecked ? ClickedRadioButton : UnClickedRadioButton}
        alt={isChecked ? 'Checked' : 'Unchecked'}
      />
    </div>
  );
};

export default RadioButtonAtom;
