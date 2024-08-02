import React from 'react';
import ModalTitleAtom from '@/_components/common/atoms/ModalTitleAtom';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import { CloseIcon } from '@/_assets/icons';
import Image from 'next/image';

interface ModalModuleProps {
  title: string;
  children: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmButtonStyle?: 'yellow' | 'dark' | 'red';
  cancelButtonStyle?: 'yellow' | 'dark' | 'red';
  infoText?: string;
}

const ModalModule = ({
  title,
  children,
  onConfirm,
  onCancel,
  confirmText = '확인',
  cancelText = '취소',
  confirmButtonStyle = 'yellow',
  cancelButtonStyle = 'dark',
  infoText,
}: ModalModuleProps) => {
  return (
    <div className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black/30">
      <form className="relative w-[600px] rounded-regular bg-white p-10 text-center">
        <button className="absolute right-5 top-5" onClick={onCancel}>
          <Image src={CloseIcon} alt="x" />
        </button>
        <div className="flex pb-10 text-center">
          <ModalTitleAtom title={title} />
        </div>
        {children}
        <div className="flex w-full gap-2 pt-10">
          <ButtonAtom
            buttonStyle={cancelButtonStyle}
            width="grow"
            onClick={onCancel}
            text={cancelText}
            type="button"
          />

          <ButtonAtom
            buttonStyle={confirmButtonStyle}
            width="grow"
            onClick={onConfirm}
            text={confirmText}
            type="button"
          />
        </div>
        <p className="pt-5 text-center text-5 text-sub-200">{infoText}</p>
      </form>
    </div>
  );
};

export default ModalModule;
