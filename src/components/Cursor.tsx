import { useEffect, useRef } from "react";
import color from "../data/color";
import styled from "styled-components";
import { useAppSelector } from "../hooks";
import gsap from "gsap";

type cursorPoint = {
    isHover?: boolean;
    x?: number;
    y?: number;
};
const CursorPoint = styled.div<cursorPoint>`
    position: fixed;
    left: var(--x);
    top: var(--y);
    transform: translate(-50%, -50%);
    width: ${(props) => (props.isHover === true ? "50px" : "8px")};
    height: ${(props) => (props.isHover === true ? "50px" : "8px")};
    border-radius: 50%;
    background: ${(props) =>
        props.isHover === true ? "transparent" : color.common.black};
    border: 2px dashed ${color.common.black};
    z-index: 20;
    pointer-events: none;
    transition: background 0.2s, width 0.5s, height 0.5s;
    opacity: 0;
    animation: ${(props) =>
        props.isHover === true ? "rotation 8s linear infinite;" : ""};
    @keyframes rotation {
        100% {
            transform: translate(-50%, -50%) rotate(360deg);
            transform-origin: center;
        }
    }
    @media (hover: none) {
        display: none;
    }
`;

type cursor = {
    isHover?: boolean;
};

const Cursor: React.FC<cursor> = () => {
    //const [cursorXY, setCursorXY] = useState({ x: -100, y: -100 });
    const loadingReducers = useAppSelector((state) => state.loadingReducers);
    const cursorReducers = useAppSelector((state) => state.cursorReducers);
    const element = useRef<HTMLDivElement | null>(null);
    const isHover = cursorReducers.isHover;
    useEffect(() => {
        if (loadingReducers.isLoading) return;
        gsap.fromTo(
            element.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.2 }
        );
    }, [loadingReducers.isLoading]);
    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            //const x = e.clientX - (isHover ? 10 : 5);
            //const y = e.clientY - (isHover ? 10 : 5);
            //setCursorXY({ x, y });
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

    return <CursorPoint isHover={isHover} ref={element} />;
};

export default Cursor;
