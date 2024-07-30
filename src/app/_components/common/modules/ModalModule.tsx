import React from 'react';
import ModalTitleAtom from '@/_components/common/atoms/ModalTitleAtom';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import { CloseIcon } from '@/_assets/icons';
import Image from 'next/image';

interface ModalModuleProps {
  title: string;
  children: React.ReactNode;
  onClick: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmButtonStyle?: 'yellow' | 'dark' | 'red';
  cancelButtonStyle?: 'yellow' | 'dark' | 'red';
}

const ModalModule = ({
  title,
  children,
  onClick,
  onConfirm,
  onCancel,
  confirmText = '확인',
  cancelText = '취소',
  confirmButtonStyle = 'yellow',
  cancelButtonStyle = 'dark',
}: ModalModuleProps) => {
  return (
    <div className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black/30">
      <div className="relative w-[600px] overflow-hidden rounded-regular bg-white p-10">
        <button className="absolute right-5 top-5" onClick={onClick}>
          <Image src={CloseIcon} alt="x" />
        </button>
        <div className="flex pb-10 text-center">
          <ModalTitleAtom title={title} />
        </div>
        {children}
        <div className="flex w-full gap-2 pt-10">
          <ButtonAtom
            buttonStyle={confirmButtonStyle}
            width="grow"
            onClick={onCancel}
            text={cancelText}
            type="button"
          />

          <ButtonAtom
            buttonStyle={cancelButtonStyle}
            width="grow"
            onClick={onConfirm}
            text={confirmText}
            type="button"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalModule;
