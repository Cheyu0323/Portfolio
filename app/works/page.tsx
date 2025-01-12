"use client";

import usePageStore from "@/store/pageStore";
import { useEffect } from "react";
import workList from "@/public/workList.json";
import WorkItem from "@/components/WorkItem";
import { GoogleAnalytics } from "@next/third-parties/google";

const Works = () => {
    const { isMenuDisplay, currentClick, handelSetCurrentClick } =
        usePageStore();
    useEffect(() => {
        handelSetCurrentClick("works");
    }, [handelSetCurrentClick]);
    if (isMenuDisplay) return <></>;
    if (currentClick != "works") return <></>;
    return (
        <>
            <title>{`張哲瑜 Portfolio - Works`}</title>
            <GoogleAnalytics gaId="G-EPLTFP1W3H" />
            <main className="h-full z-20 relative overflow-scroll opacity-0 animate-opacity delay-300">
                <div className="flex flex-col gap-y-8 w-full max-w-5xl m-auto">
                    {workList
                        .filter((work) => work.pics.mobile != null)
                        .map((work) => {
                            return (
                                <WorkItem key={work.id} {...work}></WorkItem>
                            );
                        })}
                </div>
                <div className=" grid grid-cols-2 gap-3 mt-8 w-full max-w-5xl m-auto">
                    {workList
                        .filter((work) => work.pics.mobile == null)
                        .map((work) => {
                            return (
                                <WorkItem key={work.id} {...work}></WorkItem>
                            );
                        })}
                </div>
            </main>{" "}
        </>
    );
};

export default Works;
