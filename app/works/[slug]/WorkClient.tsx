"use client";
import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import useCursorStore from "@/store/cursorStore";
import usePageStore from "@/store/pageStore";
type WorkVisibilityProps = { children: ReactNode };
type WorkLinkProps = {
    href: string;
    children: ReactNode;
    eventLabel: string;
    className?: string;
    external?: boolean;
    ariaLabel?: string;
};
export const WorkLink = ({
    href,
    children,
    eventLabel,
    className,
    external = false,
    ariaLabel,
}: WorkLinkProps) => {
    const handleIsHover = useCursorStore().handleIsHover;
    const handleMouseEnter = () => {
        handleIsHover(true);
    };
    const handleMouseLeave = () => {
        handleIsHover(false);
    };
    const handleClick = () => {
        window.gtag?.("event", "click", {
            category: external ? "專案項目_跳轉" : "專案項目",
            label: eventLabel,
        });
        handleMouseLeave();
    };
    return (
        <Link
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            aria-label={ariaLabel}
            className={className}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {children}
        </Link>
    );
};
const WorkVisibility = ({ children }: WorkVisibilityProps) => {
    const { isMenuDisplay, handelSetCurrentClick } = usePageStore();
    useEffect(() => {
        handelSetCurrentClick("works");
    }, [handelSetCurrentClick]);
    return (
        <main
            aria-hidden={isMenuDisplay}
            className={`h-full z-20 relative overflow-scroll ${
                isMenuDisplay ? "opacity-0 pointer-events-none" : ""
            }`}
        >
            {children}
        </main>
    );
};
export default WorkVisibility;
