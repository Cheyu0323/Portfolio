"use client";

import type {
    ReactNode,
} from "react";

import usePageStore from "@/store/pageStore";

type WorksVisibilityProps = {
    children: ReactNode;
};

const WorksVisibility = ({
    children,
}: WorksVisibilityProps) => {
    const { isMenuDisplay } =
        usePageStore();

    return (
        <main
            aria-hidden={
                isMenuDisplay
            }
            className={`
                h-full
                z-20
                relative
                overflow-scroll
                transition-opacity
                duration-300

                ${
                    isMenuDisplay
                        ? "opacity-0 pointer-events-none"
                        : "opacity-100"
                }
            `}
        >
            {children}
        </main>
    );
};

export default WorksVisibility;