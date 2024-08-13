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
import { useGetNoticeDetailQuery } from '@/_hooks/admin/useGetNoticeDetailQuery';
import dayjs from 'dayjs';
import AdminLoading from '@/_components/admin/adminLoading';
import NetworkError from '@/_components/common/networkError';

interface NoticeDetailPageProps {
  params: {
    id: number;
  };
}

const UserNoticeDetailPage = ({ params }: NoticeDetailPageProps) => {
  const { id } = params;
  const router = useRouter();

  const { data, isLoading, isError } = useGetNoticeDetailQuery({
    announcementId: id,
  });

  return (
    <section className="px-40 pt-18">
      <div>
        {!data ? (
          isLoading ? (
            <AdminLoading />
          ) : isError ? (
            <NetworkError />
          ) : (
            <div>데이터 없음</div>
          )
        ) : (
          <>
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
              optionalContent={dayjs(
                data.announcementDetailInfo.createdAt,
              ).format('YYYY.MM.DD')}
            />
            <div className="py-2.5">
              {data.announcementDetailInfo.fileInfos &&
              data.announcementDetailInfo.fileInfos.length > 0 ? (
                <div className="space-y-1.5">
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
              ) : null}
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
                    onClick={() =>
                      router.push(`/support/notices/${data.postId}`)
                    }
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
          </>
        )}
      </div>
    </section>
  );
};

export default UserNoticeDetailPage;
