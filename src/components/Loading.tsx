import styled, { keyframes } from "styled-components";
import color from "../data/color";

const LoadAnimation = keyframes`
	0% {
		color: ${color.primary.light};
    }
    50% {
		color: ${color.primary.dark};
    }
    100% {
		color: ${color.primary.light};
    }
`;

const Loading = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 187.5px;
    height: 180px;
	  pointer-events: none;
    background: ${color.primary.gray};
    clip-path: polygon(50% 0, 100% 38%, 81% 100%, 19% 100%, 0 38%);
    &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 98.5%;
        height: 98.5%;
        background: ${color.common.white};
        clip-path: polygon(50% 0, 100% 38%, 81% 100%, 19% 100%, 0 38%);
    }
    &::after {
        content: "Loading";
        position: absolute;
        top: 53%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: ${color.primary.light};
        font-size: 20px;
        font-weight: 500;
        letter-spacing: 2px;
        animation: ${LoadAnimation} 2s infinite;
    }
`;

export default Loading;
