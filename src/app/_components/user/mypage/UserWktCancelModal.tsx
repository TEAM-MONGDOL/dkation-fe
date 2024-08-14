import UserModalAtom from '@/_components/user/common/atoms/UserModalAtom';
import UserModalTitleAtom from '@/_components/user/common/atoms/UserModalTextAtom';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';

interface UserWktCancelModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const UserWktCancelModal = ({
  onClose,
  onConfirm,
}: UserWktCancelModalProps) => (
  <UserModalAtom onClose={onClose}>
    <UserModalTitleAtom className="text-2">
      신청을 취소하시겠습니까?
    </UserModalTitleAtom>
    <div className="mt-6 flex justify-center gap-x-2">
      <UserButtonAtom
        text="취소"
        buttonStyle="white"
        size="md"
        onClick={onClose}
        className="rounded-md"
        type="button"
      />
      <UserButtonAtom
        text="확인"
        buttonStyle="yellow"
        size="md"
        onClick={() => {
          onConfirm();
          onClose();
        }}
        className="rounded-md"
        type="button"
      />
    </div>
  </UserModalAtom>
);

export default UserWktCancelModal;
