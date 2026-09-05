"use client";

import { type MouseEvent, type ReactNode } from "react";
import Link from "next/link";

import { usePageTransition } from "@/components/PageTransition";

type TransitionLinkProps = {
    href: string;
    children: ReactNode;
    className?: string;
    ariaLabel?: string;
    ariaCurrent?: "page";
    tabIndex?: number;
    id?: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: () => void;
};

const TransitionLink = ({
    href,
    children,
    className,
    ariaLabel,
    tabIndex,
    id,
    ariaCurrent,
    onMouseEnter,
    onMouseLeave,
    onClick,
}: TransitionLinkProps) => {
    const { navigate, isTransitioning } = usePageTransition();

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            event.button !== 0
        ) {
            return;
        }

        event.preventDefault();

        if (isTransitioning()) {
            return;
        }

        onClick?.();

        navigate(href);
    };

    return (
        <Link
            href={href}
            id={id}
            aria-label={ariaLabel}
            tabIndex={tabIndex}
            className={className}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={handleClick}
            aria-current={ariaCurrent}
        >
            {children}
        </Link>
    );
};

export default TransitionLink;
