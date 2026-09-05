"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import TransitionLink from "@/components/TransitionLink";
import useCursorStore from "@/store/cursorStore";
import usePageStore from "@/store/pageStore";
import { trackNavigationClick } from "@/lib/analytics";

const Menu = () => {
    const menuRef = useRef<HTMLUListElement | null>(null);

    const { isMenuDisplay, handleRouteChange } = usePageStore();

    const pathname = usePathname();

    const handleIsHover = useCursorStore().handleIsHover;

    const handleMouseEnter = () => {
        handleIsHover(true);
    };

    const handleMouseLeave = () => {
        handleIsHover(false);
    };

    useEffect(() => {
        if (pathname === "/") {
            handleRouteChange("/");
            return;
        }

        if (pathname === "/about") {
            handleRouteChange("about");
            return;
        }

        if (pathname.startsWith("/works")) {
            handleRouteChange("works");
        }
    }, [pathname, handleRouteChange]);

    useGSAP(
        () => {
            const menu = menuRef.current;

            if (!menu) {
                return;
            }

            if (!isMenuDisplay) {
                return;
            }

            gsap.killTweensOf(menu);

            gsap.set(menu, {
                opacity: 1,
                pointerEvents: "auto",
            });

            gsap.timeline()
                .from("#home", {
                    x: 20,
                    opacity: 0,
                    duration: 0.5,
                })
                .from(
                    "#about",
                    {
                        x: 20,
                        opacity: 0,
                        duration: 0.5,
                    },
                    ">-.3",
                )
                .from(
                    "#works",
                    {
                        x: 20,
                        opacity: 0,
                        duration: 0.5,
                    },
                    ">-.3",
                );
        },
        {
            dependencies: [isMenuDisplay],
            scope: menuRef,
        },
    );

    const handleMenuClick = (page: "/" | "about" | "works", label: string) => {
        const destination = page === "/" ? "/" : `/${page}`;

        const menu = menuRef.current;

        if (menu) {
            gsap.killTweensOf(menu);

            gsap.to(menu, {
                opacity: 0,
                duration: 0.15,
                ease: "power2.out",
                pointerEvents: "none",
            });
        }

        trackNavigationClick(label.toLowerCase(), destination);

        handleMouseLeave();
    };

    const isHomePage = pathname === "/";

    const isAboutPage = pathname === "/about";

    const isWorksPage = pathname.startsWith("/works");

    return (
        <nav aria-label="主要導覽">
            <ul
                ref={menuRef}
                className={`absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-y-4 items-center justify-center tracking-[0.4rem] font-normal text-[15px] ${
                    isMenuDisplay
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                <li>
                    <TransitionLink
                        href="/"
                        id="home"
                        ariaCurrent={isHomePage ? "page" : undefined}
                        tabIndex={isMenuDisplay ? 0 : -1}
                        className={
                            isHomePage
                                ? "line-through decoration-[1.5px] pointer-events-none"
                                : ""
                        }
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleMenuClick("/", "Home")}
                    >
                        HOME
                    </TransitionLink>
                </li>

                <li>
                    <TransitionLink
                        href="/about"
                        id="about"
                        ariaCurrent={isAboutPage ? "page" : undefined}
                        tabIndex={isMenuDisplay ? 0 : -1}
                        className={
                            isAboutPage
                                ? "line-through decoration-[1.5px] pointer-events-none"
                                : ""
                        }
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleMenuClick("about", "About")}
                    >
                        ABOUT
                    </TransitionLink>
                </li>

                <li>
                    <TransitionLink
                        href="/works"
                        id="works"
                        ariaCurrent={isWorksPage ? "page" : undefined}
                        tabIndex={isMenuDisplay ? 0 : -1}
                        className={
                            isWorksPage
                                ? "line-through decoration-[1.5px] pointer-events-none"
                                : ""
                        }
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleMenuClick("works", "Works")}
                    >
                        WORKS
                    </TransitionLink>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
