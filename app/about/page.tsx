import type { Metadata } from "next";
import ScrollDown from "@/components/ScrollDown";
import AboutVisibility from "./AboutVisibility";

export const metadata: Metadata = {
    title: "關於張哲瑜｜副資料工程師・前端工程師作品集",
    description:
        "張哲瑜（Cheyu），現任鼎漢國際工程顧問股份有限公司副資料工程師，具備 React、Next.js、WebGL、API 開發、資料庫規劃與資料排程自動化等系統開發經驗。",
    alternates: {
        canonical: "/about",
    },
};

const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: "https://cheyu-portfolio.vercel.app/about",

    mainEntity: {
        "@type": "Person",
        "@id": "https://cheyu-portfolio.vercel.app/about#person",

        name: "張哲瑜",
        alternateName: "Cheyu",

        url: "https://cheyu-portfolio.vercel.app/about",

        jobTitle: "副資料工程師",

        description:
            "張哲瑜（Cheyu），現任鼎漢國際工程顧問股份有限公司副資料工程師，具備前端開發、API 開發、資料庫規劃、資料排程自動化與系統整合經驗。",

        worksFor: {
            "@type": "Organization",
            name: "鼎漢國際工程顧問股份有限公司",
        },

        alumniOf: [
            {
                "@type": "OrganizationRole",
                roleName: "網頁前端工程師",
                startDate: "2022-12",
                endDate: "2025-02",
                alumniOf: {
                    "@type": "Organization",
                    name: "杰悉科技股份有限公司",
                },
            },
            {
                "@type": "OrganizationRole",
                roleName: "網頁前端工程師",
                startDate: "2021-03",
                endDate: "2022-05",
                alumniOf: {
                    "@type": "Organization",
                    name: "環耀實境有限公司",
                },
            },
            {
                "@type": "OrganizationRole",
                roleName: "Unity3D 工程師",
                startDate: "2020-08",
                endDate: "2020-12",
                alumniOf: {
                    "@type": "Organization",
                    name: "穎利科研國際事業有限公司",
                },
            },
            {
                "@type": "CollegeOrUniversity",
                name: "國立臺中科技大學",
            },
        ],

        knowsAbout: [
            "React",
            "Next.js",
            "TypeScript",
            "JavaScript",
            "WebGL",
            "Three.js",
            "GSAP",
            "Python",
            "Flask",
            "PostgreSQL",
            "API Development",
            "Database Design",
            "Data Pipeline Automation",
        ],
    },
};

const About = () => {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(profileJsonLd).replace(
                        /</g,
                        "\\u003c"
                    ),
                }}
            />

            <AboutVisibility>
                {/* WHO AM I */}
                <div className="h-full flex flex-col gap-y-4 justify-center px-2 max-w-3xl">
                    <div className="font-sans font-medium tracking-[0.24em] text-xs opacity-75">
                        01 / WHO AM I
                    </div>

                    <h1 className="font-black tracking-[0.07em] text-[38px] md:text-[46px] leading-none mt-6">
                        張哲瑜
                    </h1>

                    <p className="font-normal tracking-[0.07em] leading-9 md:leading-10 text-[16px] md:text-[17px] opacity-90">
                        畢業於國立臺中科技大學資訊管理系，目前任職於
                        鼎漢國際工程顧問股份有限公司，擔任副資料工程師。
                        過去具備前端網頁、互動網頁與 Unity 遊戲引擎開發經驗，
                        持續透過實際專案累積 React、Next.js、WebGL
                        與系統整合相關技術經驗。
                    </p>

                    <ScrollDown />
                </div>

                {/* WORK EXPERIENCE */}
                <div className="h-full flex flex-col gap-y-4 justify-center px-2">
                    <h2 className="font-sans font-medium tracking-[0.24em] text-xs opacity-75">
                        02 / WORK EXPERIENCE
                    </h2>

                    <div className="flex flex-col gap-y-5 md:gap-y-6 tracking-wider">
                        <article className="flex flex-col gap-y-1">
                            <div className="flex flex-col md:flex-row md:items-baseline md:gap-x-5">
                                <h3 className="font-bold text-[19px] md:text-xl tracking-[0.05em]">
                                    副資料工程師
                                </h3>

                                <div className="font-light text-[11px] tracking-[0.12em] opacity-65 mt-1 md:mt-0">
                                    <time dateTime="2025-05">
                                        2025/05
                                    </time>
                                    <span className="mx-2">—</span>
                                    <span>NOW</span>
                                </div>
                            </div>

                            <div className="font-medium text-sm tracking-[0.08em] mt-2 opacity-90">
                                鼎漢國際工程顧問股份有限公司
                            </div>

                            <p className="font-normal text-xs tracking-[0.07em] leading-6 opacity-75">
                                資料庫規劃、API 開發與資料排程自動化
                            </p>
                        </article>

                        <article className="flex flex-col gap-y-1">
                            <div className="flex flex-col md:flex-row md:items-baseline md:gap-x-5">
                                <h3 className="font-bold text-[19px] md:text-xl tracking-[0.05em]">
                                    網頁前端工程師
                                </h3>

                                <div className="font-light text-[11px] tracking-[0.12em] opacity-65 mt-1 md:mt-0">
                                    <time dateTime="2022-12">
                                        2022/12
                                    </time>
                                    <span className="mx-2">—</span>
                                    <time dateTime="2025-02">
                                        2025/02
                                    </time>
                                </div>
                            </div>

                            <div className="font-medium text-sm tracking-[0.08em] mt-2 opacity-90">
                                杰悉科技股份有限公司
                            </div>

                            <p className="font-normal text-xs tracking-[0.07em] leading-6 opacity-75">
                                圖控儀表板開發
                            </p>
                        </article>

                        <article className="flex flex-col gap-y-1">
                            <div className="flex flex-col md:flex-row md:items-baseline md:gap-x-5">
                                <h3 className="font-bold text-[19px] md:text-xl tracking-[0.05em]">
                                    網頁前端工程師
                                </h3>

                                <div className="font-light text-[11px] tracking-[0.12em] opacity-65 mt-1 md:mt-0">
                                    <time dateTime="2021-03">
                                        2021/03
                                    </time>
                                    <span className="mx-2">—</span>
                                    <time dateTime="2022-05">
                                        2022/05
                                    </time>
                                </div>
                            </div>

                            <div className="font-medium text-sm tracking-[0.08em] mt-2 opacity-90">
                                環耀實境有限公司
                            </div>

                            <p className="font-normal text-xs tracking-[0.07em] leading-6 opacity-75">
                                環景網頁製作、互動網頁製作
                            </p>
                        </article>

                        <article className="flex flex-col gap-y-1">
                            <div className="flex flex-col md:flex-row md:items-baseline md:gap-x-5">
                                <h3 className="font-bold text-[19px] md:text-xl tracking-[0.05em]">
                                    Unity3D 工程師
                                </h3>

                                <div className="font-light text-[11px] tracking-[0.12em] opacity-65 mt-1 md:mt-0">
                                    <time dateTime="2020-08">
                                        2020/08
                                    </time>
                                    <span className="mx-2">—</span>
                                    <time dateTime="2020-12">
                                        2020/12
                                    </time>
                                </div>
                            </div>

                            <div className="font-medium text-sm tracking-[0.08em] mt-2 opacity-90">
                                穎利科研國際事業有限公司
                            </div>

                            <p className="font-normal text-xs tracking-[0.07em] leading-6 opacity-75">
                                虛擬會議平台開發
                            </p>
                        </article>
                    </div>

                    <ScrollDown />
                </div>

                {/* SKILLS */}
                <div className="h-full flex flex-col gap-y-4 justify-center px-2">
                    <h2 className="font-sans font-medium tracking-[0.24em] text-xs opacity-75">
                        03 / SKILLS
                    </h2>

                    <div className="flex flex-col gap-y-7 tracking-wider">
                        <div className="flex flex-col font-sans">
                            <h3 className="font-bold text-xl md:text-[22px] tracking-[0.05em]">
                                Web Development
                            </h3>

                            <div className="flex flex-col gap-y-3 mt-5">
                                <div>
                                    <div className="font-medium text-xs tracking-[0.14em] opacity-70">
                                        BASICS
                                    </div>
                                    <div className="font-light text-sm tracking-[0.07em] leading-7 opacity-95 mt-1">
                                        HTML｜CSS｜RWD｜jQuery｜JavaScript｜TypeScript
                                    </div>
                                </div>

                                <div>
                                    <div className="font-medium text-xs tracking-[0.14em] opacity-70">
                                        STYLING
                                    </div>
                                    <div className="font-light text-sm tracking-[0.07em] leading-7 opacity-95 mt-1">
                                        SCSS｜CSS in JS｜Styled-Component｜Tailwind
                                    </div>
                                </div>

                                <div>
                                    <div className="font-medium text-xs tracking-[0.14em] opacity-70">
                                        FRONTEND FRAMEWORKS
                                    </div>
                                    <div className="font-light text-sm tracking-[0.07em] leading-7 opacity-95 mt-1">
                                        React｜Next.js
                                    </div>
                                </div>

                                <div>
                                    <div className="font-medium text-xs tracking-[0.14em] opacity-70">
                                        BACKEND
                                    </div>
                                    <div className="font-light text-sm tracking-[0.07em] leading-7 opacity-95 mt-1">
                                        Python｜Flask
                                    </div>
                                </div>

                                <div>
                                    <div className="font-medium text-xs tracking-[0.14em] opacity-70">
                                        WEBGL
                                    </div>
                                    <div className="font-light text-sm tracking-[0.07em] leading-7 opacity-95 mt-1">
                                        Three.js｜CesiumJS｜Krpano
                                    </div>
                                </div>

                                <div>
                                    <div className="font-medium text-xs tracking-[0.14em] opacity-70">
                                        ANIMATION
                                    </div>
                                    <div className="font-light text-sm tracking-[0.07em] leading-7 opacity-95 mt-1">
                                        GSAP
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AboutVisibility>
        </>
    );
};

export default About;