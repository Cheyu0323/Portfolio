import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";

import "./globals.css";
import CursorPoint from "@/components/CursorPoint";
import Header from "@/components/Header";
import Scene from "@/components/Scene";
import Menu from "@/components/Menu";

// If loading a variable font, you don't need to specify the font weight
const inter = Noto_Sans_TC({ subsets: ["latin"] });
export const metadata: Metadata = {
    title: "張哲瑜 Portfolio",
    verification: {
        google: "Uw8Um7WPleUknL2B4Q-pkcDno48H1njl2JcaCAHi5Rg",
    },
    description:
        "我是張哲瑜，來自國立臺中科技大學資訊管理系的畢業生，擁有豐富的網頁前端開發和 Unity 遊戲引擎開發經驗。我專注於精緻的網頁設計與開發，熟悉 React、Next.js、WebGL 等技術，並致力於創造創新且互動性強的網頁應用。",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} bg-background/30 h-svh relative`}
            >
                <Header />
                <Menu />
                <CursorPoint />
                <Scene />
                <div className="w-11/12 max-w-7xl m-auto h-[calc(100%_-_5.5rem)]">
                    {children}
                </div>
            </body>
        </html>
    );
}
