import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#ebebeb",
                font_dark: "#404040",
            },
            animation: {
                "rotate-360": "rotate 8s linear infinite",
                lineDwon: "lineDown 2s linear infinite",
                color: "color 4s linear infinite",
                opacity: "opacity 1s forwards"
            },
            keyframes: {
                rotate: {
                    "100%": {
                        transform: "translate(-50%, -50%) rotate(360deg)",
                    },
                },
                opacity: {
                    "100%": {
                        opacity: "100",
                    },
                },
                lineDown: {
                    "0%": {
                        top: "-15px",
                    },
                    "100%": {
                        top: "35px",
                    },
                },
                color: {
                    "0%": {
                        color: "#858585",
                    },
                    "25%": {
                        color: "#404040",
                    },
                    "50%": {
                        color: "#858585",
                    },
                    "75%": {
                        color: "#404040",
                    },
                    "100%": {
                        color: "#858585",
                    },
                },
            },
        },
    },
    plugins: [],
};
export default config;
