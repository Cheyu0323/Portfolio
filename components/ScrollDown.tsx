"use client";
import React from "react";

const ScrollDown: React.FC = () => {
    return (
        <div className="relative text-xs font-medium tracking-wider flex items-center gap-x-3 mt-20">
            <div className="h-full w-[1px] bg-font_dark/50 relative overflow-hidden">
                <div className="animate-lineDwon absolute h-full w-full bg-font_dark"></div>
            </div>
            <div className="animate-color">Please scroll down</div>
            <div className="relative w-1">
                <div className="absolute top-0.5 left-0 -translate-y-1/2 -translate-x-1/2 border-b border-font_dark w-1.5 rotate-45"></div>
                <div className="absolute top-0.5 left-full -translate-y-1/2 -translate-x-1/2 border-b border-font_dark w-1.5 -rotate-45"></div>
            </div>
        </div>
    );
};

export default ScrollDown;
