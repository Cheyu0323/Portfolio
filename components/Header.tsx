"use client";
import useCursorStore from "@/store/cursorStore";
import usePageStore from "@/store/pageStore";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const HanburgerMenu: React.FC = () => {
    const { isMenuDisplay, handleIsMenuDisplay } = usePageStore();
    const isHover = useCursorStore().handleIsHover;
    const onEnter = () => isHover(true);
    const onLeave = () => isHover(false);
    const menuIconRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        if (isMenuDisplay) handleIsMenuDisplay(false);
        if (!isMenuDisplay) {
            handleIsMenuDisplay(true);
            window.gtag("event", "click", {
                category: "清單",
                label: "清單",
            });
        }
        onLeave();
    };

    useGSAP(() => {
        if (!isMenuDisplay) return;
        gsap.context(() => {
            const tl = gsap
                .timeline({ paused: true })
                .to("#line1", { "--opacity": 0, duration: 0 }, 0)
                .to("#line1", { y: 7, duration: 0.5 }, 0)
                .to("#line2", { "--opacity": 0, opacity: 0, duration: 0 }, 0)
                .to("#line3", { y: -7, duration: 0.5 }, 0)
                .to("#line3", { "--opacity": 0, duration: 0 }, 0)
                .to("#line1", { rotate: "45deg", duration: 0.5 }, 0)
                .to("#line3", { rotate: "-45deg", duration: 0.5 }, 0);

            if (isMenuDisplay) tl.play();
        }, menuIconRef);
    }, [isMenuDisplay]);

    useGSAP(() => {
        if (isMenuDisplay) return;
        gsap.context(() => {
            const tl1 = gsap
                .timeline({ paused: true })
                .to("#line1", { rotate: "0", duration: 0.5 }, 0)
                .to("#line3", { rotate: "0", duration: 0.5 }, 0)
                .to("#line1", { "--opacity": 1, y: 0, duration: 0.5 }, 0)
                .to("#line2", { "--opacity": 1, opacity: 1, duration: 0 }, 0)
                .to("#line3", { "--opacity": 1, y: 0, duration: 0.5 }, 0);

            if (!isMenuDisplay) tl1.play();
        }, menuIconRef);
    }, [isMenuDisplay]);

    return (
        <div
            ref={menuIconRef}
            className="group w-9 h-4 flex overflow-hidden flex-col justify-between *:block *:w-full *:relative *:border-b *:border-font_dark *:after:contents:'' *:after:w-full *:after:absolute *:after:top-[1px] *:after:block *:after:h-1 *:after:-rotate-[12deg] *:after:border-b *:after:border-font_dark/50  *:after:opacity-[--opacity] *:after:duration-500"
            onMouseOver={onEnter}
            onMouseOut={onLeave}
            onClick={handleClick}
        >
            <span
                id="line1"
                className="group-hover:after:[transform:rotate(-12deg)_translateX(50px)]"
            ></span>
            <span
                id="line2"
                className="group-hover:after:[transform:rotate(-12deg)_translateX(50px)]"
            ></span>
            <span
                id="line3"
                className="group-hover:after:[transform:rotate(-12deg)_translateX(50px)]"
            ></span>
        </div>
    );
};

const Header: React.FC = () => {
    return (
        <header className="relative z-20 inset-x-0 top-0 py-8 flex items-center justify-between w-11/12 max-w-7xl m-auto">
            <div className="font-thin tracking-[10px] font-sans">CHEYU</div>
            <HanburgerMenu />
        </header>
    );
};

export default Header;
