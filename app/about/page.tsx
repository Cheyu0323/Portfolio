"use client";

import ScrollDown from "@/components/ScrollDown";
import usePageStore from "@/store/pageStore";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect } from "react";

const About = () => {
    const { isMenuDisplay, currentClick, handelSetCurrentClick } =
        usePageStore();
    useEffect(() => {
        handelSetCurrentClick("about");
    }, [handelSetCurrentClick]);

    if (isMenuDisplay) return <></>;
    if (currentClick != "about") return <></>;
    return (
        <>
            <title>{`張哲瑜 Portfolio - About`}</title>
            <GoogleAnalytics gaId="G-EPLTFP1W3H" />
            <main className="h-full z-20 relative overflow-scroll opacity-0 animate-opacity delay-300">
                <div className="h-full flex flex-col gap-y-4 justify-center px-2 max-w-3xl">
                    <div className="font-extralight font-sans tracking-widest">
                        ― WHO AM I
                    </div>
                    <div className="font-black tracking-widest text-3xl mt-5">
                        張哲瑜
                    </div>
                    <div className="tracking-widest leading-10 text-[17px]">
                        畢業於國立臺中科技大學資訊管理系，勇於嘗試各種技術，過去接觸過
                        Unity
                        遊戲引擎開發、互動網頁開發，透過不斷實戰累積經驗，努力成為一個全方位的人。
                    </div>
                    <ScrollDown />
                </div>
                <div className="h-full flex flex-col gap-y-4 justify-center px-2">
                    <div className="font-extralight font-sans tracking-widest">
                        ― Work Experience
                    </div>
                    <div className="flex flex-col gap-y-9 tracking-wider">
                        <div className="flex flex-col gap-y-0.5  font-medium text-xs">
                            <div className="font-bold text-lg">
                                網頁前端工程師
                            </div>
                            <div className="text-sm mt-2.5">
                                杰悉科技股份有限公司
                            </div>
                            <div>2022/12 ~ 2025/02</div>
                            <div>圖控儀表板開發</div>
                        </div>
                        <div className="flex flex-col gap-y-0.5  font-medium text-xs">
                            <div className="font-bold text-lg">
                                網頁前端工程師
                            </div>
                            <div className="text-sm mt-2.5">
                                環耀實境有限公司
                            </div>
                            <div>2021/03 ~ 2022/05</div>
                            <div>環景網頁製作、互動網頁製作</div>
                        </div>
                        <div className="flex flex-col gap-y-0.5  font-medium text-xs">
                            <div className="font-bold text-lg">
                                Unity3D 工程師
                            </div>
                            <div className="text-sm mt-2.5">
                                穎利科研國際事業有限公司
                            </div>
                            <div>2020/08 ~ 2020/12</div>
                            <div>虛擬會議平台開發</div>
                        </div>
                    </div>
                    <ScrollDown />
                </div>
                <div className="h-full flex flex-col gap-y-4 justify-center px-2">
                    <div className="font-extralight font-sans tracking-widest">
                        ― Skill
                    </div>
                    <div className="flex flex-col gap-y-9 tracking-wider">
                        <div className="flex flex-col gap-y-2 font-sans text-sm">
                            <div className="font-bold text-lg">
                                Web development
                            </div>
                            <div className="mt-2.5">
                                Basics：HTML｜CSS｜RWD｜jQuery｜JavaScript｜TypeScript
                            </div>
                            <div>
                                Styling：SCSS｜CSS in JS｜Styled-Component |
                                Tailwind
                            </div>
                            <div>Frontend Frameworks：React | Next</div>
                            <div>WebGL：THREE.js | CESIUM | Krpano </div>
                            <div>Animation: GSAP </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default About;
