import React from 'react';
import ModalTitleAtom from '@/_components/common/atoms/ModalTitleAtom';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';

interface ModalModuleProps {
  title: string;
  content: React.ReactNode;
  children: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmButtonType?: 'yellow' | 'dark' | 'red';
  cancelButtonType?: 'yellow' | 'dark' | 'red';
}

const ModalModule = ({
  title,
  content,
  children,
  onConfirm,
  onCancel,
  confirmText = '확인',
  cancelText = '취소',
  confirmButtonType = 'yellow',
  cancelButtonType = 'dark',
}: ModalModuleProps) => {
  return (
    <div className="bg-white w-[600px] p-10 rounded-[5px] overflow-hidden">
      <div className="flex text-center pb-10">
        <ModalTitleAtom title={title} />
      </div>
      <div className="w-full text-center">{children}</div>
      <div className="flex w-full gap-2 pt-10">
        <ButtonAtom buttonType={cancelButtonType} flexGrow onClick={onCancel}>
          {cancelText}
        </ButtonAtom>

        <ButtonAtom buttonType={confirmButtonType} flexGrow onClick={onConfirm}>
          {confirmText}
        </ButtonAtom>
      </div>
    </div>
  );
};

export default ModalModule;
