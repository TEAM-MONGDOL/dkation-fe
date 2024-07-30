'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  RadioButtonCheckedIcon,
  RadioButtonUncheckedIcon,
} from '@/_assets/icons';

const RadioButtonAtom = ({ isChecked }: { isChecked: boolean }) => {
  return (
    <div className="inline-block" role="presentation">
      <Image
        src={isChecked ? RadioButtonCheckedIcon : RadioButtonUncheckedIcon}
        alt={isChecked ? 'Checked' : 'Unchecked'}
      />
    </div>
  );
};

export default RadioButtonAtom;
