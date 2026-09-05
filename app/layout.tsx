import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";

import PageTransition, {
    PageTransitionContent,
} from "@/components/PageTransition";

import CursorPoint from "@/components/CursorPoint";
import Header from "@/components/Header";
import Scene from "@/components/Scene";
import Menu from "@/components/Menu";

const notoSansTC = Noto_Sans_TC({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://cheyu-portfolio.vercel.app"),

    icons: {
        icon: "/favicon.ico",
    },

    title: {
        default: "張哲瑜 Cheyu｜前端工程師作品集",
        template: "%s｜張哲瑜 Cheyu",
    },

    description:
        "張哲瑜（Cheyu），現任鼎漢國際工程顧問股份有限公司副資料分析師，具備 React、Next.js、WebGL、Python、Flask、API 開發與資料庫相關開發經驗。",

    authors: [
        {
            name: "張哲瑜",
        },
    ],

    creator: "張哲瑜",

    alternates: {
        canonical: "/",
    },

    verification: {
        google: "Uw8Um7WPleUknL2B4Q-pkcDno48H1njl2JcaCAHi5Rg",
    },

    openGraph: {
        type: "website",
        locale: "zh_TW",
        url: "/",
        siteName: "張哲瑜 Cheyu Portfolio",
        title: "張哲瑜 Cheyu｜前端工程師作品集",
        description:
            "張哲瑜（Cheyu）的個人作品集，包含前端開發、WebGL、Python、Flask、資料庫與系統整合相關經驗。",
    },

    twitter: {
        card: "summary_large_image",
        title: "張哲瑜 Cheyu｜前端工程師作品集",
        description:
            "張哲瑜（Cheyu）的個人作品集，包含前端開發、WebGL、Python、Flask、資料庫與系統整合相關經驗。",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-Hant">
            <body
                className={`${notoSansTC.className} bg-background/30 h-svh relative`}
            >
                <PageTransition>
                    <Header />

                    <Menu />

                    <CursorPoint />

                    <Scene />

                    <PageTransitionContent>
                        <div className="w-11/12 max-w-7xl m-auto h-[calc(100%_-_5.5rem)]">
                            {children}
                        </div>
                    </PageTransitionContent>
                </PageTransition>

                <GoogleAnalytics gaId="G-EPLTFP1W3H" />
            </body>
        </html>
    );
}
