import type { Metadata } from "next";

import WorkItem from "@/components/WorkItem";
import workList from "@/public/work_list.json";

import WorksVisibility from "./WorksVisibility";

export const metadata: Metadata = {
    title: "作品集",
    description:
        "張哲瑜（Cheyu）的個人作品集，包含 React、Next.js、Three.js、Cesium、WebGL、Unity 等前端、3D 互動與系統開發專案。",
    alternates: {
        canonical: "/works",
    },
};

const Works = () => {
    const worksWithMobile = workList.filter(
        (work) =>
            work.images.mobile != null &&
            work.images.mobile.length > 0,
    );

    const worksWithoutMobile = workList.filter(
        (work) =>
            work.images.mobile == null ||
            work.images.mobile.length === 0,
    );

    return (
        <WorksVisibility>
            <div className="flex flex-col gap-y-8 w-full max-w-5xl m-auto">
                {worksWithMobile.map((work) => (
                    <WorkItem
                        key={work.id}
                        {...work}
                    />
                ))}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-8 w-full max-w-5xl m-auto">
                {worksWithoutMobile.map((work) => (
                    <WorkItem
                        key={work.id}
                        {...work}
                    />
                ))}
            </div>
        </WorksVisibility>
    );
};

export default Works;