"use client";
import useCursorStore from "@/store/cursorStore";
import usePageStore from "@/store/pageStore";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";
import React, { useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

const Menu: React.FC = () => {
    const menuRef = useRef<HTMLUListElement>(null);
    const { isMenuDisplay, handleIsMenuDisplay, handelSetCurrentClick } =
        usePageStore();
    const pathname = usePathname();
    const isHover = useCursorStore().handleIsHover;
    const onEnter = () => isHover(true);
    const onLeave = () => isHover(false);

    useGSAP(() => {
        if (!isMenuDisplay) return;

        gsap.context(() => {
            gsap.timeline()
                .from("#home", { x: 20, opacity: 0, duration: 0.5 }, 0)
                .from("#about", { x: 20, opacity: 0, duration: 0.5 }, ">-.3")
                .from("#works", { x: 20, opacity: 0, duration: 0.5 }, ">-.3");
        }, menuRef);
    }, [isMenuDisplay]);

    return (
        <ul
            ref={menuRef}
            className={`absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-y-4 items-center justify-center tracking-[0.4rem] font-normal text-[15px] duration-150 ${
                isMenuDisplay
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
            }`}
        >
            <Link
                href="/"
                id="home"
                className={`${
                    pathname == "/"
                        ? "line-through decoration-[1.5px] pointer-events-none"
                        : ""
                }`}
                onMouseOver={onEnter}
                onMouseOut={onLeave}
                onClick={() => {
                    handleIsMenuDisplay(false);
                    handelSetCurrentClick("/");
                    window.gtag("event", "click", {
                        category: "清單",
                        label: "Home",
                    });
                    onLeave();
                }}
            >
                HOME
            </Link>
            <Link
                href="/about"
                id="about"
                className={`${
                    pathname == "/about"
                        ? "line-through decoration-[1.5px]pointer-events-none"
                        : ""
                }`}
                onMouseOver={onEnter}
                onMouseOut={onLeave}
                onClick={() => {
                    handleIsMenuDisplay(false);
                    handelSetCurrentClick("about");
                    window.gtag("event", "click", {
                        category: "清單",
                        label: "About",
                    });
                    onLeave();
                }}
            >
                ABOUT
            </Link>
            <Link
                href="/works"
                id="works"
                className={`${
                    pathname.includes("works")
                        ? "line-through decoration-[1.5px]pointer-events-none"
                        : ""
                }`}
                onMouseOver={onEnter}
                onMouseOut={onLeave}
                onClick={() => {
                    handleIsMenuDisplay(false);
                    handelSetCurrentClick("works");
                    window.gtag("event", "click", {
                        category: "清單",
                        label: "Works",
                    });
                    onLeave();
                }}
            >
                WORKS
            </Link>
        </ul>
    );
};

export default Menu;
