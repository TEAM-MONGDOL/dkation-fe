'use client';

import React from 'react';
import Image from 'next/image';
import { ClickedCheckBox, UnClickedCheckBox } from '@/_assets/icons';

interface CheckboxAtomProps {
  isChecked: boolean;
}

const CheckboxAtom = ({ isChecked }: CheckboxAtomProps) => {
  return (
    <div className="inline-block" role="presentation">
      <Image
        src={isChecked ? ClickedCheckBox : UnClickedCheckBox}
        alt={isChecked ? 'Checked' : 'Unchecked'}
      />
    </div>
  );
};
export default CheckboxAtom;
