import React from 'react';
import ModalTitleAtom from '@/_components/common/atoms/ModalTitleAtom';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';

interface ModalModuleProps {
  title: string;
  // content 없애고 children으로 대체 필요
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
    <div className="w-screen h-screen fixed left-0 top-0 flex items-center justify-center bg-black/30 z-10">
      <div className="bg-white w-[600px] p-10 rounded-[5px] overflow-hidden">
        <div className="flex text-center pb-10">
          <ModalTitleAtom title={title} />
        </div>
        <div className="w-full text-center">{content}</div>
        {children}
        <div className="flex w-full gap-2 pt-10">
          <ButtonAtom buttonType={cancelButtonType} flexGrow onClick={onCancel}>
            {cancelText}
          </ButtonAtom>
          <ButtonAtom
            buttonType={confirmButtonType}
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
