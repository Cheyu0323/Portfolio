"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import TransitionLink from "@/components/TransitionLink";
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

    if (external) {
        return (
            <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ariaLabel}
                className={className}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                {children}
            </Link>
        );
    }

    return (
        <TransitionLink
            href={href}
            ariaLabel={ariaLabel}
            className={className}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {children}
        </TransitionLink>
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
