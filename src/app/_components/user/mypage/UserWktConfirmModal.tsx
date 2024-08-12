'use client';

import React from 'react';
import UserModalAtom from '@/_components/user/common/atoms/UserModalAtom';
import UserModalTitleAtom from '@/_components/user/common/atoms/UserModalTextAtom';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';

const UserWktConfirmModal = ({
  onClose,
  onConfirm,
  onCancel,
  modalType,
}: {
  onClose: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
  modalType:
    | 'confirm'
    | 'cancel'
    | 'cancellationConfirmation'
    | 'acceptConfirmation';
}) => (
  <UserModalAtom>
    {modalType === 'confirm' && (
      <>
        <UserModalTitleAtom className="text-2">
          해당 워케이션에 <span className="font-bold">당첨</span> 되었습니다.
          <br />
          워케이션을 수락하시겠습니까?
        </UserModalTitleAtom>
        <div className="mt-6 flex justify-center gap-x-2">
          <UserButtonAtom
            text="포기하기"
            buttonStyle="lightGray"
            size="md"
            onClick={onCancel}
            className="rounded-md"
            type="button"
          />
          <UserButtonAtom
            text="수락하기"
            buttonStyle="yellow"
            size="md"
            onClick={onConfirm}
            className="rounded-md"
            type="button"
          />
        </div>
      </>
    )}

    {modalType === 'cancel' && (
      <>
        <UserModalTitleAtom className="text-2">
          <span className="font-bold">포기하면 다시 수락이 어려워요!</span>
          <br />
          그래도 포기하시겠습니까?
        </UserModalTitleAtom>
        <div className="mt-6 flex justify-center gap-x-2">
          <UserButtonAtom
            text="취소하기"
            buttonStyle="white"
            size="md"
            onClick={onClose}
            className="rounded-md"
            type="button"
          />
          <UserButtonAtom
            text="포기하기"
            buttonStyle="yellow"
            size="md"
            onClick={onConfirm}
            className="rounded-md"
            type="button"
          />
        </div>
      </>
    )}

    {modalType === 'cancellationConfirmation' && (
      <>
        <UserModalTitleAtom className="text-2">
          워케이션이 취소되었습니다.
        </UserModalTitleAtom>
        <div className="mt-6 flex justify-center">
          <UserButtonAtom
            text="확인"
            buttonStyle="yellow"
            size="md"
            onClick={onClose}
            className="rounded-md"
            type="button"
          />
        </div>
      </>
    )}

    {modalType === 'acceptConfirmation' && (
      <>
        <UserModalTitleAtom className="text-2">
          수락이 완료되었습니다.
        </UserModalTitleAtom>
        <div className="mt-6 flex justify-center">
          <UserButtonAtom
            text="확인"
            buttonStyle="yellow"
            size="md"
            onClick={onClose}
            className="rounded-md"
            type="button"
          />
        </div>
      </>
    )}
  </UserModalAtom>
);

export default UserWktConfirmModal;
