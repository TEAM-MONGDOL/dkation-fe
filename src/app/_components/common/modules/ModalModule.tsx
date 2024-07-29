import React from 'react';
import ModalTitleAtom from '@/_components/common/atoms/ModalTitleAtom';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import { Delete } from '@/_assets/icons';
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
    <div className="flex w-screen h-screen fixed top-0 left-0 bg-black/30 z-10 items-center justify-center">
      <div className="bg-white w-[600px] p-10 rounded-regular overflow-hidden relative">
        <button className="absolute top-5 right-5" onClick={onClick}>
          <Image src={Delete} alt="x" />
        </button>
        <div className="flex text-center pb-10">
          <ModalTitleAtom title={title} />
        </div>
        {children}
        <div className="flex w-full gap-2 pt-10">
          <ButtonAtom
            buttonStyle={confirmButtonStyle}
            flexGrow
            onClick={onCancel}
          >
            {cancelText}
          </ButtonAtom>

          <ButtonAtom
            buttonStyle={cancelButtonStyle}
            flexGrow
            onClick={onConfirm}
          >
            {confirmText}
          </ButtonAtom>
        </div>
      </div>
    </div>
  );
};

export default ModalModule;
