import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import Image from 'next/image';
import ReactQueryProvider from './_hooks/ReactQueryProvider';
import { AuthContext } from './_context/AuthContext';
import { DkationLogo } from './_assets/icons';

const notoSansKR = Noto_Sans_KR({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dkation: 워케이션 추첨 서비스',
  icons: [
    {
      url: '/favicon.svg',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSansKR.className}>
        <AuthContext>
          <ReactQueryProvider>
            {/* 1024px 미만일 때만 표시 */}
            <div className="flex h-screen flex-col items-center justify-center text-center lg:hidden">
              <Image src={DkationLogo} alt="logo" width={200} height={200} />
              <h1 className="mt-8 break-keep text-1 font-semibold">
                본 서비스는 PC 기기를 대상으로
                <br className="block md:hidden" /> 제공되고 있습니다.
              </h1>
              <p className="mt-3 break-keep text-2">
                쾌적한 서비스 이용을 위해 PC 기기에서 접속해주세요.
              </p>
            </div>
            {/* 1024px 이상일 때만 표시 */}
            <div className="hidden lg:block">{children}</div>
          </ReactQueryProvider>
        </AuthContext>
      </body>
    </html>
  );
}
