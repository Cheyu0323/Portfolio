"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import useCursorStore from "@/store/cursorStore";
import usePageStore from "@/store/pageStore";

const HamburgerMenu = () => {
    const { isMenuDisplay, handleIsMenuDisplay } = usePageStore();
    const handleIsHover = useCursorStore().handleIsHover;

    const menuIconRef = useRef<HTMLButtonElement>(null);

    const handleMouseEnter = () => {
        handleIsHover(true);
    };

    const handleMouseLeave = () => {
        handleIsHover(false);
    };

    const handleClick = () => {
        const nextMenuDisplay = !isMenuDisplay;

        handleIsMenuDisplay(nextMenuDisplay);

        if (nextMenuDisplay) {
            window.gtag?.("event", "click", {
                category: "清單",
                label: "清單",
            });
        }

        handleMouseLeave();
    };

    useGSAP(
        () => {
            const line1 = "#line1";
            const line2 = "#line2";
            const line3 = "#line3";

            if (isMenuDisplay) {
                gsap.timeline()
                    .to(line1, { "--opacity": 0, duration: 0 }, 0)
                    .to(line1, { y: 7, duration: 0.5 }, 0)
                    .to(
                        line2,
                        {
                            "--opacity": 0,
                            opacity: 0,
                            duration: 0,
                        },
                        0,
                    )
                    .to(line3, { y: -7, duration: 0.5 }, 0)
                    .to(line3, { "--opacity": 0, duration: 0 }, 0)
                    .to(line1, { rotate: "45deg", duration: 0.5 }, 0.5)
                    .to(line3, { rotate: "-45deg", duration: 0.5 }, 0.5);

                return;
            }

            gsap.timeline()
                .to(line1, { rotate: "0deg", duration: 0.5 }, 0)
                .to(line3, { rotate: "0deg", duration: 0.5 }, 0)
                .to(
                    line1,
                    {
                        "--opacity": 1,
                        y: 0,
                        duration: 0.5,
                    },
                    0.5,
                )
                .to(
                    line2,
                    {
                        "--opacity": 1,
                        opacity: 1,
                        duration: 0,
                    },
                    0.5,
                )
                .to(
                    line3,
                    {
                        "--opacity": 1,
                        y: 0,
                        duration: 0.5,
                    },
                    0.5,
                );
        },
        {
            dependencies: [isMenuDisplay],
            scope: menuIconRef,
        },
    );

    return (
        <button
            ref={menuIconRef}
            type="button"
            aria-label={isMenuDisplay ? "關閉選單" : "開啟選單"}
            aria-expanded={isMenuDisplay}
            className="group w-9 h-4 flex overflow-hidden flex-col justify-between *:block *:w-full *:relative *:border-b *:border-font_dark *:after:contents-[''] *:after:w-full *:after:absolute *:after:top-[1px] *:after:block *:after:h-1 *:after:-rotate-[12deg] *:after:border-b *:after:border-font_dark/50 *:after:opacity-[--opacity] *:after:duration-500"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <span
                id="line1"
                aria-hidden="true"
                className="group-hover:after:[transform:rotate(-12deg)_translateX(50px)]"
            />

            <span
                id="line2"
                aria-hidden="true"
                className="group-hover:after:[transform:rotate(-12deg)_translateX(50px)]"
            />

            <span
                id="line3"
                aria-hidden="true"
                className="group-hover:after:[transform:rotate(-12deg)_translateX(50px)]"
            />
        </button>
    );
};

const Header = () => {
    return (
        <header className="relative z-20 inset-x-0 top-0 py-8 flex items-center justify-between w-11/12 max-w-7xl m-auto">
            <div className="font-thin tracking-[10px] font-sans">
                CHEYU
            </div>

            <HamburgerMenu />
        </header>
    );
};

export default Header;