import React from "react";
import Link from "next/link";
import useCursorStore from "@/store/cursorStore";
import { useRouter } from "next/navigation";

type WorkItemProps = {
    id: number;
    name: string;
    title: string;
    types: Array<{ id: string; item: string }>;
    url?: string;
    technologys: Array<{ id: string; item: string }>;
    pics: {
        desktop: Array<{ id: string; item: string }>;
        mobile?: Array<{ id: string; item: string }>;
    };
};

const WorkItem: React.FC<WorkItemProps> = ({ name, title, url, pics }) => {
    const router = useRouter();
    const isHover = useCursorStore().handleIsHover;
    const handleMouseOver = () => isHover(true);
    const handleMouseOut = () => isHover(false);
    const handleClick = () => {
        router.push(`/works/${name}`);
        window.gtag("event", "click", {
            category: "專案項目",
            label: title,
        });
        handleMouseOut();
    };
    return (
        <div className="w-full flex flex-col">
            <div className="w-full h-full table group shadow-md">
                <div
                    className={`${
                        pics.mobile != null ? "w-9/12" : "w-12/12"
                    } h-full table-cell`}
                    onClick={handleClick}
                >
                    <div
                        className="pt-[60%] bg-cover relative before:absolute before:w-full before:h-full before:top-0 before:left-0 group-hover:before:bg-black/40 before:duration-500 after:content-['VIEW'] after:opacity-0 after:tracking-tighter after:font-bold after:text-white after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 group-hover:after:opacity-100 group-hover:after:tracking-widest after:duration-500"
                        style={{
                            backgroundImage: `url(${pics.desktop[0].item})`,
                        }}
                    ></div>
                </div>
                {pics.mobile != null && (
                    <div className="w-3/12 h-full table-cell ">
                        <div
                            className="pt-[180%] ml-[3%] bg-center bg-cover relative before:absolute before:w-full before:h-full before:top-0 before:left-0 group-hover:before:bg-black/40 before:duration-500 after:content-['VIEW'] after:opacity-0 after:tracking-tighter after:font-bold after:text-white after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 group-hover:after:opacity-100 group-hover:after:tracking-widest after:duration-500"
                            style={{
                                backgroundImage: `url(${pics.mobile[0].item})`,
                            }}
                        ></div>
                    </div>
                )}
            </div>
            <div className=" flex flex-row gap-x-1 items-center mt-3 font-semibold tracking-wider relative">
                <div
                    className="hover:text-font_dark duration-150"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    onClick={handleClick}
                >
                    {title}
                </div>
                {url != null && (
                    <Link
                        target="_blank"
                        href={url}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        onClick={() => {
                            window.gtag("event", "click", {
                                category: "專案項目_跳轉",
                                label: title,
                            });
                            handleMouseOut();
                        }}
                    >
                        <div className="relative w-3.5 h-3.5 hover:text-font_dark duration-150 rounded-full ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-full"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                                <path d="m21 3-9 9" />
                                <path d="M15 3h6v6" />
                            </svg>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default WorkItem;
