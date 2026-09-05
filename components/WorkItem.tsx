"use client";

import TransitionLink from "@/components/TransitionLink";
import useCursorStore from "@/store/cursorStore";
import { trackProjectClick, trackProjectExternalClick } from "@/lib/analytics";

type WorkItemProps = {
    id: number;
    slug: string;
    title: string;
    categories: string[];
    projectUrl?: string;
    technologies: string[];
    images: {
        desktop: Array<{
            src: string;
            alt: string;
        }>;
        mobile?: Array<{
            src: string;
            alt: string;
        }>;
    };
};

const WorkItem = ({ slug, title, projectUrl, images }: WorkItemProps) => {
    const handleIsHover = useCursorStore().handleIsHover;

    const handleMouseEnter = () => {
        handleIsHover(true);
    };

    const handleMouseLeave = () => {
        handleIsHover(false);
    };

    const handleProjectClick = () => {
        trackProjectClick(title, slug);

        handleMouseLeave();
    };

    const handleExternalClick = () => {
        if (projectUrl) {
            trackProjectExternalClick(title, slug, projectUrl);
        }

        handleMouseLeave();
    };

    const workUrl = `/works/${slug}`;

    const desktopCover = images.desktop[0]?.src;

    const mobileCover = images.mobile?.[0]?.src;

    const hasMobile = Boolean(images.mobile?.length && mobileCover);

    return (
        <article className="w-full flex flex-col">
            <div className="w-full h-full table group shadow-md">
                <TransitionLink
                    href={workUrl}
                    ariaLabel={`查看 ${title} 專案`}
                    className={`${
                        hasMobile ? "w-9/12" : "w-12/12"
                    } h-full table-cell`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleProjectClick}
                >
                    <div
                        className="pt-[60%] bg-cover relative before:absolute before:w-full before:h-full before:top-0 before:left-0 group-hover:before:bg-black/40 before:duration-500 after:content-['VIEW'] after:opacity-0 after:tracking-tighter after:font-bold after:text-white after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 group-hover:after:opacity-100 group-hover:after:tracking-widest after:duration-500"
                        style={{
                            backgroundImage: desktopCover
                                ? `url(${desktopCover})`
                                : undefined,
                        }}
                    />
                </TransitionLink>

                {hasMobile && mobileCover && (
                    <TransitionLink
                        href={workUrl}
                        ariaLabel={`查看 ${title} 專案`}
                        className="w-3/12 h-full table-cell"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleProjectClick}
                    >
                        <div
                            className="pt-[180%] ml-[3%] bg-center bg-cover relative before:absolute before:w-full before:h-full before:top-0 before:left-0 group-hover:before:bg-black/40 before:duration-500 after:content-['VIEW'] after:opacity-0 after:tracking-tighter after:font-bold after:text-white after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 group-hover:after:opacity-100 group-hover:after:tracking-widest after:duration-500"
                            style={{
                                backgroundImage: `url(${mobileCover})`,
                            }}
                        />
                    </TransitionLink>
                )}
            </div>

            <div className="flex flex-row gap-x-1 items-center mt-3 font-semibold tracking-wider relative">
                <h2>
                    <TransitionLink
                        href={workUrl}
                        className="hover:text-font_dark duration-150"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleProjectClick}
                    >
                        {title}
                    </TransitionLink>
                </h2>

                {projectUrl && (
                    <a
                        href={projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${title} 專案網站`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleExternalClick}
                    >
                        <div className="relative w-3.5 h-3.5 hover:text-font_dark duration-150 rounded-full">
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
                                <path d="m21 3-9 9" />
                                <path d="M15 3h6v6" />
                            </svg>
                        </div>
                    </a>
                )}
            </div>
        </article>
    );
};

export default WorkItem;
