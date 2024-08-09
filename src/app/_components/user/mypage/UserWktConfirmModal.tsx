import React, { useState } from 'react';
import UserModalAtom from '@/_components/user/common/atoms/UserModalAtom';
import UserModalTitleAtom from '@/_components/user/common/atoms/UserModalTextAtom';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';

const UserWktConfirmModal = ({
  onClose,
  onConfirm,
  onCancel,
}: {
  onClose: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
}) => {
  const [currentModal, setCurrentModal] = useState<
    | 'confirm'
    | 'cancel'
    | 'cancellationConfirmation'
    | 'acceptConfirmation'
    | 'none'
  >('confirm');

  const handleCancelClick = () => {
    setCurrentModal('cancel');
  };

  const handleCancelConfirm = () => {
    setCurrentModal('cancellationConfirmation');
  };

  const handleAcceptConfirm = () => {
    onConfirm(); // 수락 로직 실행
    setCurrentModal('acceptConfirmation');
  };

  const closeModal = () => {
    setCurrentModal('none');
    onClose();
  };

  return (
    <>
      {currentModal === 'confirm' && (
        <UserModalAtom>
          <UserModalTitleAtom className="text-2">
            해당 워케이션에 <p className="inline-block font-bold">당첨</p>{' '}
            되었습니다.
            <br />
            워케이션을 수락하시겠습니까?
          </UserModalTitleAtom>
          <div className="mt-6 flex justify-center gap-x-2">
            <UserButtonAtom
              text="포기하기"
              buttonStyle="lightGray"
              size="md"
              onClick={handleCancelClick}
              className="rounded-md"
              type="button"
            />
            <UserButtonAtom
              text="수락하기"
              buttonStyle="yellow"
              size="md"
              onClick={handleAcceptConfirm}
              className="rounded-md"
              type="button"
            />
          </div>
        </UserModalAtom>
      )}

      {currentModal === 'cancel' && (
        <UserModalAtom>
          <UserModalTitleAtom className="text-2">
            <p className="font-bold">포기하면 다시 수락이 어려워요!</p>
            그래도 포기하시겠습니까?
          </UserModalTitleAtom>
          <div className="mt-6 flex justify-center gap-x-2">
            <UserButtonAtom
              text="취소하기"
              buttonStyle="white"
              size="md"
              onClick={() => setCurrentModal('confirm')}
              className="rounded-md"
              type="button"
            />
            <UserButtonAtom
              text="포기하기"
              buttonStyle="yellow"
              size="md"
              onClick={handleCancelConfirm}
              className="rounded-md"
              type="button"
            />
          </div>
        </UserModalAtom>
      )}

      {currentModal === 'cancellationConfirmation' && (
        <UserModalAtom>
          <UserModalTitleAtom className="text-2">
            워케이션이 취소되었습니다.
          </UserModalTitleAtom>
          <div className="mt-6 flex justify-center">
            <UserButtonAtom
              text="확인"
              buttonStyle="yellow"
              size="md"
              onClick={closeModal}
              className="rounded-md"
              type="button"
            />
          </div>
        </UserModalAtom>
      )}

      {currentModal === 'acceptConfirmation' && (
        <UserModalAtom>
          <UserModalTitleAtom className="text-2">
            수락이 완료되었습니다.
          </UserModalTitleAtom>
          <div className="mt-6 flex justify-center">
            <UserButtonAtom
              text="확인"
              buttonStyle="yellow"
              size="md"
              onClick={closeModal}
              className="rounded-md"
              type="button"
            />
          </div>
        </UserModalAtom>
      )}
    </>
  );
};

export default UserWktConfirmModal;
