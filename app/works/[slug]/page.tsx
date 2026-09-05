import type { Metadata } from "next";
import { notFound } from "next/navigation";
import workList from "@/public/work_list.json";
import WorkVisibility, { WorkLink } from "./WorkClient";
type WorkPageProps = { params: { slug: string } };
export const dynamicParams = false;

export function generateStaticParams() {
    return workList.map((work) => ({ slug: work.slug }));
}

export function generateMetadata({ params }: WorkPageProps): Metadata {
    const work = workList.find((item) => item.slug === params.slug);
    if (!work) {
        return { title: "作品不存在", robots: { index: false, follow: false } };
    }
    const technologies = work.technologies.join("、");
    const description = `張哲瑜（Cheyu）的「${work.title}」專案作品，使用 ${technologies} 等技術進行開發。`;
    const coverImage = work.images.desktop[0]?.src;
    return {
        title: work.title,
        description,
        alternates: { canonical: `/works/${work.slug}` },
        openGraph: {
            type: "website",
            locale: "zh_TW",
            url: `/works/${work.slug}`,
            siteName: "張哲瑜 Cheyu Portfolio",
            title: `${work.title}｜張哲瑜`,
            description,
            images: coverImage
                ? [{ url: coverImage, alt: work.images.desktop[0].alt }]
                : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: `${work.title}｜張哲瑜`,
            description,
            images: coverImage ? [coverImage] : undefined,
        },
    };
}
const Work = ({ params }: WorkPageProps) => {
    const work = workList.find((item) => item.slug === params.slug);
    if (!work) {
        notFound();
    }
    const currentIndex = workList.findIndex(
        (item) => item.slug === params.slug
    );
    const prevWork = currentIndex > 0 ? workList[currentIndex - 1] : null;
    const nextWork =
        currentIndex < workList.length - 1 ? workList[currentIndex + 1] : null;
    return (
        <WorkVisibility>
            <div className="text-xl tracking-wide font-bold flex flex-row gap-x-1 items-center w-full max-w-5xl m-auto">
                <h1> {work.title} </h1>
                {work.projectUrl && (
                    <WorkLink
                        href={work.projectUrl}
                        external
                        projectName={work.title}
                        projectSlug={work.slug}
                        ariaLabel={`前往 ${work.title} 專案網站`}
                        className="ml-auto flex items-center justify-center gap-x-1 p-2 border hover:border-black duration-700 rounded bg-[#303030] hover:bg-white text-white hover:text-black"
                    >
                        <span className="font-normal text-xs">
                            view project
                        </span>
                        <span className="relative w-3.5 h-3.5 hover:text-font_dark duration-150 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-full"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                                <path d="m21 3-9 9" /> <path d="M15 3h6v6" />
                            </svg>
                        </span>
                    </WorkLink>
                )}
            </div>
            <ul
                className="flex gap-x-2 text-sm text-font_dark w-full max-w-5xl m-auto"
                aria-label="專案使用技術"
            >
                {work.technologies.map((technology) => (
                    <li key={technology}> #{technology} </li>
                ))}
            </ul>
            <div className="mt-3 w-full flex flex-col gap-y-3 max-w-5xl m-auto">
                {work.images.desktop.map((image, index) => (
                    <div key={image.src} className="shadow-md overflow-hidden">
                        <img
                            src={image.src}
                            alt={image.alt}
                            loading={index === 0 ? "eager" : "lazy"}
                            decoding={index === 0 ? "sync" : "async"}
                            fetchPriority={index === 0 ? "high" : "auto"}
                            className="block w-full h-auto"
                        />
                    </div>
                ))}
            </div>
            {work.images.mobile && work.images.mobile.length > 0 && (
                <div className="mt-3 w-full flex flex-row flex-nowrap gap-x-3 max-w-5xl m-auto">
                    {work.images.mobile.map((image) => (
                        <div key={image.src} className="shadow-md">
                            <img
                                src={image.src}
                                alt={image.alt}
                                sizes="100vw"
                                loading="lazy"
                                decoding="async"
                                className="w-full h-auto"
                            />
                        </div>
                    ))}
                </div>
            )}
            <nav
                aria-label="作品導覽"
                className="mt-10 mb-5 flex justify-between w-full tracking-wider text-font_dark text-sm hover:*:text-black *:duration-150 *:underline *:underline-offset-4 max-w-5xl m-auto"
            >
                {prevWork ? (
                    <WorkLink
                        href={`/works/${prevWork.slug}`}
                        projectSlug={work.slug}
                        direction="prev"
                    >
                        PREV
                    </WorkLink>
                ) : (
                    <span
                        aria-hidden="true"
                        className="opacity-0 pointer-events-none"
                    >
                        PREV
                    </span>
                )}
                <WorkLink
                    href="/works"
                    projectSlug={work.slug}
                    direction="index"
                >
                    INDEX
                </WorkLink>
                {nextWork ? (
                    <WorkLink
                        href={`/works/${nextWork.slug}`}
                        projectSlug={work.slug}
                        direction="next"
                    >
                        NEXT
                    </WorkLink>
                ) : (
                    <span
                        aria-hidden="true"
                        className="opacity-0 pointer-events-none"
                    >
                        NEXT
                    </span>
                )}
            </nav>
        </WorkVisibility>
    );
};
export default Work;
