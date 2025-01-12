"use client";
import useCursorStore from "@/store/cursorStore";
import React, { useEffect } from "react";

const CursorPoint: React.FC = () => {
    const { isHover } = useCursorStore();
    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            window.document.documentElement
                .querySelector("body")
                ?.style.setProperty("--x", e.clientX + "px");
            window.document.documentElement
                .querySelector("body")
                ?.style.setProperty("--y", e.clientY + "px");
        };
        window.addEventListener("mousemove", moveCursor);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
        };
    }, []);
    
    return (
        <div
            className={`border-2 border-black border-dashed rounded-full fixed -translate-x-1/2 -translate-y-1/2 z-50 top-[--y] left-[--x] transition-[width,height,background-color] duration-700 animate-rotate-360 pointer-events-none ${
                isHover ? "w-14 h-14" : "w-2.5 h-2.5 bg-black"
            } `}
        ></div>
    );
};

export default CursorPoint;
