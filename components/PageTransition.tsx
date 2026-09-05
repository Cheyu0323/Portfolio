"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    type ReactNode,
    type RefObject,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

type PageTransitionContextType = {
    navigate: (href: string) => void;
    isTransitioning: () => boolean;
    containerRef: RefObject<HTMLDivElement>;
};

const PageTransitionContext = createContext<PageTransitionContextType | null>(
    null,
);

type PageTransitionProps = {
    children: ReactNode;
};

const PageTransition = ({ children }: PageTransitionProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const containerRef = useRef<HTMLDivElement | null>(null);

    const isTransitioningRef = useRef(false);

    const hasMountedRef = useRef(false);

    const reduceMotionRef = useRef(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );

        const updateReduceMotion = () => {
            reduceMotionRef.current = mediaQuery.matches;
        };

        updateReduceMotion();

        mediaQuery.addEventListener("change", updateReduceMotion);

        return () => {
            mediaQuery.removeEventListener("change", updateReduceMotion);
        };
    }, []);

    const navigate = useCallback(
        (href: string) => {
            if (isTransitioningRef.current) {
                return;
            }

            const container = containerRef.current;

            if (!container) {
                router.push(href);
                return;
            }

            if (reduceMotionRef.current) {
                router.push(href);
                return;
            }

            isTransitioningRef.current = true;

            gsap.killTweensOf(container);

            gsap.to(container, {
                opacity: 0,
                duration: 0.18,
                ease: "power2.out",

                onComplete: () => {
                    router.push(href);
                },
            });
        },
        [router],
    );

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        if (!hasMountedRef.current) {
            hasMountedRef.current = true;

            gsap.set(container, {
                opacity: 1,
            });

            return;
        }

        if (reduceMotionRef.current) {
            gsap.set(container, {
                opacity: 1,
            });

            isTransitioningRef.current = false;

            return;
        }

        gsap.killTweensOf(container);

        gsap.fromTo(
            container,
            {
                opacity: 0,
            },
            {
                opacity: 1,
                duration: 0.28,
                ease: "power2.out",
                clearProps: "opacity",

                onComplete: () => {
                    isTransitioningRef.current = false;
                },
            },
        );
    }, [pathname]);

    return (
        <PageTransitionContext.Provider
            value={{
                navigate,
                isTransitioning: () => isTransitioningRef.current,
                containerRef,
            }}
        >
            {children}
        </PageTransitionContext.Provider>
    );
};

type PageTransitionContentProps = {
    children: ReactNode;
};

export const PageTransitionContent = ({
    children,
}: PageTransitionContentProps) => {
    const context = useContext(PageTransitionContext);

    if (!context) {
        throw new Error(
            "PageTransitionContent must be used inside PageTransition",
        );
    }

    return (
        <div ref={context.containerRef} className="h-[calc(100%_-_5.5rem)]">
            {children}
        </div>
    );
};

export const usePageTransition = () => {
    const context = useContext(PageTransitionContext);

    if (!context) {
        throw new Error("usePageTransition must be used inside PageTransition");
    }

    return context;
};

export default PageTransition;
