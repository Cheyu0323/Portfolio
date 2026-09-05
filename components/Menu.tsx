"use client";

import {
    useEffect,
    useRef,
} from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import useCursorStore from "@/store/cursorStore";
import usePageStore from "@/store/pageStore";

import {
    trackNavigationClick,
} from "@/lib/analytics";

const Menu = () => {
    const menuRef =
        useRef<HTMLUListElement>(null);

    const {
        isMenuDisplay,
        handleRouteChange,
    } = usePageStore();

    const pathname = usePathname();

    const handleIsHover =
        useCursorStore().handleIsHover;

    /*
     * =================================
     * Route → Zustand
     * =================================
     *
     * pathname 真正變更後，
     * 才同步 Page Store + 關閉 Menu。
     */
    useEffect(() => {
        if (pathname === "/") {
            handleRouteChange("/");
            return;
        }

        if (pathname === "/about") {
            handleRouteChange("about");
            return;
        }

        if (
            pathname.startsWith(
                "/works",
            )
        ) {
            handleRouteChange("works");
        }
    }, [
        pathname,
        handleRouteChange,
    ]);

    const handleMouseEnter = () => {
        handleIsHover(true);
    };

    const handleMouseLeave = () => {
        handleIsHover(false);
    };

    useGSAP(
        () => {
            if (!isMenuDisplay) {
                return;
            }

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
            dependencies: [
                isMenuDisplay,
            ],

            scope: menuRef,
        },
    );

    const handleMenuClick = (
        page:
            | "/"
            | "about"
            | "works",

        label: string,
    ) => {
        const destination =
            page === "/"
                ? "/"
                : `/${page}`;

        /*
         * 非常重要：
         *
         * 這裡不關 Menu。
         * 這裡也不改 currentClick。
         *
         * 等 Link 導航完成，
         * pathname effect 再處理。
         */

        trackNavigationClick(
            label.toLowerCase(),
            destination,
        );

        handleMouseLeave();
    };

    const isHomePage =
        pathname === "/";

    const isAboutPage =
        pathname === "/about";

    const isWorksPage =
        pathname.startsWith(
            "/works",
        );

    return (
        <nav aria-label="主要導覽">
            <ul
                ref={menuRef}
                className={`
                    absolute
                    z-10
                    top-1/2
                    left-1/2
                    -translate-x-1/2
                    -translate-y-1/2

                    flex
                    flex-col
                    gap-y-4
                    items-center
                    justify-center

                    tracking-[0.4rem]
                    font-normal
                    text-[15px]

                    duration-150

                    ${
                        isMenuDisplay
                            ? "opacity-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none"
                    }
                `}
            >
                <li>
                    <Link
                        href="/"
                        id="home"
                        aria-current={
                            isHomePage
                                ? "page"
                                : undefined
                        }
                        tabIndex={
                            isMenuDisplay
                                ? 0
                                : -1
                        }
                        className={
                            isHomePage
                                ? "line-through decoration-[1.5px] pointer-events-none"
                                : ""
                        }
                        onMouseEnter={
                            handleMouseEnter
                        }
                        onMouseLeave={
                            handleMouseLeave
                        }
                        onClick={() =>
                            handleMenuClick(
                                "/",
                                "Home",
                            )
                        }
                    >
                        HOME
                    </Link>
                </li>

                <li>
                    <Link
                        href="/about"
                        id="about"
                        aria-current={
                            isAboutPage
                                ? "page"
                                : undefined
                        }
                        tabIndex={
                            isMenuDisplay
                                ? 0
                                : -1
                        }
                        className={
                            isAboutPage
                                ? "line-through decoration-[1.5px] pointer-events-none"
                                : ""
                        }
                        onMouseEnter={
                            handleMouseEnter
                        }
                        onMouseLeave={
                            handleMouseLeave
                        }
                        onClick={() =>
                            handleMenuClick(
                                "about",
                                "About",
                            )
                        }
                    >
                        ABOUT
                    </Link>
                </li>

                <li>
                    <Link
                        href="/works"
                        id="works"
                        aria-current={
                            isWorksPage
                                ? "page"
                                : undefined
                        }
                        tabIndex={
                            isMenuDisplay
                                ? 0
                                : -1
                        }
                        className={
                            isWorksPage
                                ? "line-through decoration-[1.5px] pointer-events-none"
                                : ""
                        }
                        onMouseEnter={
                            handleMouseEnter
                        }
                        onMouseLeave={
                            handleMouseLeave
                        }
                        onClick={() =>
                            handleMenuClick(
                                "works",
                                "Works",
                            )
                        }
                    >
                        WORKS
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;