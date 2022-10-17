import React, {useEffect } from "react";
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

const Load = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 157.5px;
    height: 150px;
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
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: ${color.primary.light};
        font-size: 20px;
        font-weight: 300;
        letter-spacing: 3px;
        animation: ${LoadAnimation} 2s infinite;
    }
`;

const Loading = () => {
	useEffect(() => {
	  console.log("A")
	}, [])
	
	return <Load></Load>
}


export default Loading;
