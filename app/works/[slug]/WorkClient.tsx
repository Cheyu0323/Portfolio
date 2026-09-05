"use client";

import { type ReactNode } from "react";
import Link from "next/link";

import useCursorStore from "@/store/cursorStore";
import usePageStore from "@/store/pageStore";

import {
    trackProjectExternalClick,
    trackProjectNavigation,
} from "@/lib/analytics";

type WorkVisibilityProps = {
    children: ReactNode;
};

type WorkLinkProps = {
    href: string;
    children: ReactNode;
    className?: string;
    external?: boolean;
    ariaLabel?: string;

    projectName?: string;
    projectSlug: string;

    direction?: "prev" | "next" | "index";
};

export const WorkLink = ({
    href,
    children,
    className,
    external = false,
    ariaLabel,
    projectName,
    projectSlug,
    direction,
}: WorkLinkProps) => {
    const handleIsHover = useCursorStore().handleIsHover;

    const handleMouseEnter = () => {
        handleIsHover(true);
    };

    const handleMouseLeave = () => {
        handleIsHover(false);
    };

    const handleClick = () => {
        if (external && projectName) {
            trackProjectExternalClick(projectName, projectSlug, href);
        }

        if (!external && direction) {
            trackProjectNavigation(direction, projectSlug, href);
        }

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
    const { isMenuDisplay } = usePageStore();

    return (
        <main
            aria-hidden={isMenuDisplay}
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

export default WorkVisibility;
