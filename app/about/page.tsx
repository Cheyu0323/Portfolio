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
                <div className="h-full flex flex-col gap-y-4 justify-center px-2 max-w-3xl">
                    <div className="font-light font-sans tracking-widest text-sm">
                        ― WHO AM I
                    </div>
                    <h1 className="font-black tracking-widest text-3xl mt-5">
                        張哲瑜
                    </h1>
                    <p className="font-normal tracking-widest leading-10 text-[17px]">
                        畢業於國立臺中科技大學資訊管理系，目前任職於
                        鼎漢國際工程顧問股份有限公司，擔任副資料工程師。
                        過去具備前端網頁、互動網頁與 Unity 遊戲引擎開發經驗，
                        持續透過實際專案累積 React、Next.js、WebGL
                        與系統整合相關技術經驗。
                    </p>
                    <ScrollDown />
                </div>
                <div className="h-full flex flex-col gap-y-4 justify-center px-2">
                    <h2 className="font-light font-sans tracking-widest text-sm">
                        ― Work Experience
                    </h2>
                    <div className="flex flex-col gap-y-5 tracking-wider">
                        <article className="flex flex-col gap-y-1 text-xs">
                            <h3 className="font-bold text-lg">副資料工程師</h3>
                            <div className="font-medium text-sm mt-2">
                                鼎漢國際工程顧問股份有限公司
                            </div>
                            <div className="font-light text-xs opacity-70">
                                <time dateTime="2025-05">2025/05</time> {" ~ "}
                                現職
                            </div>
                            <p className="font-normal text-xs">
                                資料庫規劃、API 開發與資料排程自動化
                            </p>
                        </article>
                        <article className="flex flex-col gap-y-1 text-xs">
                            <h3 className="font-bold text-lg">
                                網頁前端工程師
                            </h3>
                            <div className="font-medium text-sm mt-2">
                                杰悉科技股份有限公司
                            </div>
                            <div className="font-light text-xs opacity-70">
                                <time dateTime="2022-12">2022/12</time> {" ~ "}
                                <time dateTime="2025-02">2025/02</time>
                            </div>
                            <p className="font-normal text-xs">
                                圖控儀表板開發
                            </p>
                        </article>
                        <article className="flex flex-col gap-y-1 text-xs">
                            <h3 className="font-bold text-lg">
                                網頁前端工程師
                            </h3>
                            <div className="font-medium text-sm mt-2">
                                環耀實境有限公司
                            </div>
                            <div className="font-light text-xs opacity-70">
                                <time dateTime="2021-03">2021/03</time> {" ~ "}
                                <time dateTime="2022-05">2022/05</time>
                            </div>
                            <p className="font-normal text-xs">
                                環景網頁製作、互動網頁製作
                            </p>
                        </article>
                        <article className="flex flex-col gap-y-1 text-xs">
                            <h3 className="font-bold text-lg">
                                Unity3D 工程師
                            </h3>
                            <div className="font-medium text-sm mt-2">
                                穎利科研國際事業有限公司
                            </div>
                            <div className="font-light text-xs opacity-70">
                                <time dateTime="2020-08">2020/08</time> {" ~ "}
                                <time dateTime="2020-12">2020/12</time>
                            </div>
                            <p className="font-normal text-xs">
                                虛擬會議平台開發
                            </p>
                        </article>
                    </div>
                    <ScrollDown />
                </div>
                <div className="h-full flex flex-col gap-y-4 justify-center px-2">
                    <h2 className="font-light font-sans tracking-widest text-sm">
                        ― Skill
                    </h2>
                    <div className="flex flex-col gap-y-9 tracking-wider">
                        <div className="flex flex-col gap-y-2 font-sans text-sm">
                            <h3 className="font-bold text-lg">
                                Web development
                            </h3>
                            <div className="font-medium mt-2.5">Basics</div>
                            <div className="font-light">
                                HTML｜CSS｜RWD｜jQuery｜JavaScript｜TypeScript
                            </div>
                            <div className="font-medium mt-1">Styling</div>
                            <div className="font-light">
                                SCSS｜CSS in JS｜Styled-Component｜Tailwind
                            </div>
                            <div className="font-medium mt-1">
                                Frontend Frameworks
                            </div>
                            <div className="font-light">React｜Next.js</div>
                            <div className="font-medium mt-1">Backend</div>
                            <div className="font-light">Python｜Flask</div>
                            <div className="font-medium mt-1"> WebGL </div>
                            <div className="font-light">
                                THREE.js｜CESIUM｜Krpano
                            </div>
                            <div className="font-medium mt-1">Animation</div>
                            <div className="font-light"> GSAP </div>
                        </div>
                    </div>
                </div>
            </AboutVisibility>
        </>
    );
};
export default About;
