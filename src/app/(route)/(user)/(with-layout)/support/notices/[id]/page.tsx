'use client';

import UserArticleHeaderAtom from '@/_components/user/common/atoms/UserArticleHeaderAtom';
import UserArticleRowAtom from '@/_components/user/common/atoms/UserArticleRowAtom';
import FileModule from '@/_components/common/modules/FileModule';
import { noticeTypeConverter } from '@/_types/adminType';
import {
  UserNextNoticeButton,
  UserPreviousNoticeButton,
} from '@/_assets/icons';
import { useRouter } from 'next/navigation';
import UserNavigationButtonAtom from '@/_components/user/common/atoms/UserNavigationButtonAtom';

const UserNoticeDetailPage = () => {
  const data = {
    announcementDetailInfo: {
      id: 5,
      title: '공지사항 예제 제목',
      description: '내용이다',
      announcementType: 'ANNOUNCEMENT',
      fileInfos: [
        {
          url: 'https://mongdol-s3.s3.ap-northeast-2.amazonaws.com/announcement/9c9146391b344f14b2f0064a2b180fc8-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202024-08-06%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2011.08.59.png',
          fileName: '스크린샷 2024-08-06 오후 11.08.59.png',
        },
      ],
    },
    previousId: 3,
    postId: 4,
  };

  const router = useRouter();

  return (
    <section className="pt-18 px-40">
      <div>
        <UserArticleHeaderAtom>
          <div className="flex h-full items-center justify-center">
            <p className="text-2 font-semibold">
              {data.announcementDetailInfo.title}
            </p>
          </div>
        </UserArticleHeaderAtom>

        <UserArticleRowAtom
          leftTitle="구분"
          leftContent={
            noticeTypeConverter[
              data.announcementDetailInfo
                .announcementType as keyof typeof noticeTypeConverter
            ]
          }
          optionalContent="yyyy.mm.dd"
        />
        <div className="py-5">
          {data.announcementDetailInfo.fileInfos.map((file) => (
            <FileModule
              isUser
              key={file.url}
              fileName={file.fileName}
              fileType={
                file.fileName.endsWith('.png') ||
                file.fileName.endsWith('.jpg') ||
                file.fileName.endsWith('.jpeg')
                  ? 'image'
                  : 'other'
              }
              preview={file.url}
              buttonType="download"
            />
          ))}
        </div>
        <div className="border-t border-t-sub-100">
          <p className="whitespace-pre-line py-5 pl-3">
            {data.announcementDetailInfo.description}
          </p>
        </div>

        <div className="mt-16 flex flex-col">
          {data.postId && (
            <div className={`border-y ${!data.previousId ? '' : ''}`}>
              <UserNavigationButtonAtom
                text="다음글"
                iconSrc={UserNextNoticeButton}
                onClick={() => router.push(`/support/notices/${data.postId}`)}
              />
            </div>
          )}
          {data.previousId && (
            <div className={`border-y ${data.postId ? 'border-t-0' : ''}`}>
              <UserNavigationButtonAtom
                text="이전글"
                iconSrc={UserPreviousNoticeButton}
                onClick={() =>
                  router.push(`/support/notices/${data.previousId}`)
                }
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserNoticeDetailPage;
