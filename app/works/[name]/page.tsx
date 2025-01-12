"use client";

import usePageStore from "@/store/pageStore";
import React from "react";
import { useEffect } from "react";
import workList from "@/public/workList.json";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import useCursorStore from "@/store/cursorStore";

const Work = () => {
    const isHover = useCursorStore().handleIsHover;
    const router = useRouter();
    const { isMenuDisplay, currentClick, handelSetCurrentClick } =
        usePageStore();
    useEffect(() => {
        handelSetCurrentClick("works");
    }, [handelSetCurrentClick]);
    const pathname = usePathname();
    const name = pathname.split("/").at(-1);
    const findWork = workList.find((work) => work.name == name);
    const findIdexWork = workList.findIndex((work) => work.name == name);
    useEffect(() => {
        if (findWork == null) router.push("/works");
    });
    if (isMenuDisplay) return <></>;
    if (currentClick != "works") return <></>;
    if (findWork == null) return <></>;

    const handleMouseOver = () => isHover(true);
    const handleMouseOut = () => isHover(false);
    const handleToIndex = () => {
        router.push("/works");
        window.gtag("event", "click", {
            category: "專案項目",
            label: "主頁",
        });
    };
    const handleToNext = () => {
        const nextWork = workList[findIdexWork + 1].name;
        router.push(`/works/${nextWork}`);
        window.gtag("event", "click", {
            category: "專案項目",
            label: "下一頁",
        });
    };
    const handleToPrev = () => {
        const nextWork = workList[findIdexWork - 1].name;
        router.push(`/works/${nextWork}`);
        window.gtag("event", "click", {
            category: "專案項目",
            label: "上一頁",
        });
    };
    return (
        <main className="h-full z-20 relative overflow-scroll">
            <div className="text-xl tracking-wide font-bold flex flex-row gap-x-1 items-center w-full max-w-5xl m-auto">
                {findWork.title}
                {findWork.url != null && (
                    <Link
                        target="_blank"
                        className="ml-auto flex items-center justify-center gap-x-1 p-2 border hover:border-black duration-700 rounded"
                        href={findWork.url}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        onClick={() => {
                            window.gtag("event", "click", {
                                category: "專案項目_跳轉",
                                label: findWork.title,
                            });
                        }}
                    >
                        <div className="font-normal text-xs">view project</div>
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
            <div className="flex gap-x-2 text-sm text-font_dark w-full max-w-5xl m-auto">
                {findWork.technologys.map((item) => (
                    <span key={item.id}>#{item.item}</span>
                ))}
            </div>
            <div className="mt-3 w-full flex flex-col gap-y-3 max-w-5xl m-auto">
                {findWork.pics.desktop.map((item) => (
                    <div key={item.id} className="shadow-md">
                        <Image
                            alt={item.id}
                            src={item.item}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "100%", height: "auto" }}
                        />
                    </div>
                ))}
            </div>
            <div className="mt-3 w-full flex flex-row flex-nowrap gap-x-3 max-w-5xl m-auto">
                {findWork.pics.mobile != null &&
                    findWork.pics.mobile.map((item) => (
                        <div key={item.id} className="shadow-md">
                            <Image
                                alt={item.id}
                                src={item.item}
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: "100%", height: "auto" }}
                            />
                        </div>
                    ))}
            </div>
            <div className="mt-10 mb-5 flex justify-between w-full tracking-wider text-font_dark text-sm hover:*:text-black *:duration-150 *:underline *:underline-offset-4 max-w-5xl m-auto">
                <div
                    className={`${
                        findIdexWork == 0 ? "opacity-0 pointer-events-none" : ""
                    }`}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    onClick={handleToPrev}
                >
                    PREV
                </div>
                <div
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    onClick={handleToIndex}
                >
                    INDEX
                </div>
                <div
                    className={`${
                        findIdexWork == workList.length - 1
                            ? "opacity-0 pointer-events-none"
                            : ""
                    }`}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    onClick={handleToNext}
                >
                    NEXT
                </div>
            </div>
        </main>
    );
};

export default Work;
