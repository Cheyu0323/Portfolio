"use client";

import { useEffect, type ReactNode } from "react";

import usePageStore from "@/store/pageStore";

type WorksVisibilityProps = {
    children: ReactNode;
};

const WorksVisibility = ({ children }: WorksVisibilityProps) => {
    const {
        isMenuDisplay,
        handelSetCurrentClick,
    } = usePageStore();

    useEffect(() => {
        handelSetCurrentClick("works");
    }, [handelSetCurrentClick]);

    return (
        <main
            aria-hidden={isMenuDisplay}
            className={`h-full z-20 relative overflow-scroll ${
                isMenuDisplay
                    ? "opacity-0 pointer-events-none"
                    : "opacity-0 animate-opacity delay-300"
            }`}
        >
            {children}
        </main>
    );
};

export default WorksVisibility;