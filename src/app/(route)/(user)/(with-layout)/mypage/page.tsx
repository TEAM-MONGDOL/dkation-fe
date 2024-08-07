import UserInfosectionModule from '@/_components/user/common/modules/UserInfosectionModule';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import MyPoint from '@/_components/user/mypage/MyPoint';

const UserMyPage = () => {
  return (
    <section className="px-40 pt-18">
      <div className="pb-14">
        <MyPoint point={2000} />
      </div>
      <h2 className="text-h2 font-semibold">회원정보</h2>
      <div className="py-14">
        <UserInfosectionModule title="이름">
          <p className="flex h-4xl w-[300px] items-center bg-sub-100/20 pl-3">
            홍길동
          </p>
        </UserInfosectionModule>
        <UserInfosectionModule title="아이디">
          <p className="flex h-4xl w-[300px] items-center bg-sub-100/20 pl-3">
            abcd.ef
          </p>
        </UserInfosectionModule>
        <UserInfosectionModule title="부서">
          <p className="flex h-4xl w-[300px] items-center bg-sub-100/20 pl-3">
            개발팀
          </p>
        </UserInfosectionModule>
        <UserInfosectionModule title="총 포인트">
          <p className="flex h-4xl w-[300px] items-center bg-sub-100/20 pl-3">
            2000 P
          </p>
        </UserInfosectionModule>
      </div>
      <h2 className="text-h2 font-semibold">비밀번호 변경</h2>
      <div className="py-14">
        <UserInfosectionModule title="비밀번호">
          <UserButtonAtom
            text="비밀번호 변경하기"
            size="md"
            buttonStyle="black"
            type="button"
            className="rounded-md"
          />
        </UserInfosectionModule>
      </div>
    </section>
  );
};

export default UserMyPage;
