"use client";

import { useEffect, type ReactNode } from "react";

import usePageStore from "@/store/pageStore";

type AboutVisibilityProps = {
    children: ReactNode;
};

const AboutVisibility = ({ children }: AboutVisibilityProps) => {
    const {
        isMenuDisplay,
        currentClick,
        handelSetCurrentClick,
    } = usePageStore();

    useEffect(() => {
        handelSetCurrentClick("about");
    }, [handelSetCurrentClick]);

    const isVisible =
        !isMenuDisplay && currentClick === "about";

    return (
        <main
            aria-hidden={!isVisible}
            className={`h-full z-20 relative overflow-scroll transition-opacity duration-300 ${
                isVisible
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
            }`}
        >
            {children}
        </main>
    );
};

export default AboutVisibility;