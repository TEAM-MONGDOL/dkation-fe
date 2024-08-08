'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  RadioButtonCheckedIcon,
  RadioButtonUncheckedIcon,
} from '@/_assets/icons';

interface RadioButtonAtomProps {
  isChecked: boolean;
  size?: number;
}

const RadioButtonAtom = ({ isChecked, size = 24 }: RadioButtonAtomProps) => {
  return (
    <div className="inline-block" role="presentation">
      <Image
        width={size}
        height={size}
        src={isChecked ? RadioButtonCheckedIcon : RadioButtonUncheckedIcon}
        alt={isChecked ? 'Checked' : 'Unchecked'}
      />
    </div>
  );
};

export default RadioButtonAtom;
