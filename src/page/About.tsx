import styled, { keyframes } from "styled-components";
import { Box, Stack } from "@mui/material";
import color from "../data/color";
import { useEffect, useRef } from "react";
import { setState } from "../slices/menu";
import { useAppDispatch, useAppSelector } from "../hooks";
import gsap from "gsap";
import Typo from "../components/Typo";

const stringlineAnim = keyframes`
    0%{
        top: -15px;
    }
    100%{
        top: 35px;
    }
`;
const colorAnim = keyframes`
    20%{
        color: ${color.primary.light};
    }
    100%{
        color: ${color.common.black};
    }
`;
const Arrow = styled.div`
    width: 20px;
    height: 20px;
    position: relative;
    &:before {
        content: "";
        position: absolute;
        width: 5px;
        height: 1px;
        top: 55%;
        left: 40%;
        transform: translate(-50%, -50%) rotate(45deg);
        background-color: ${color.primary.gray};
    }
    &:after {
        content: "";
        position: absolute;
        height: 1px;
        width: 5px;
        top: 55%;
        left: 60%;
        transform: translate(-50%, -50%) rotate(-45deg);
        background-color: ${color.primary.gray};
    }
`;
const StraightLine = styled.div`
    width: 1px;
    height: 20px;
    background-color: ${color.primary.light};
    position: relative;
    overflow: hidden;
    &::before {
        content: "";
        width: 1px;
        height: 15px;
        position: absolute;
        top: -15px;
        background-color: ${color.common.black};
        animation: ${stringlineAnim} 2s infinite;
    }
`;
const ScrollText = styled.p`
    letter-spacing: 1px;
    font-weight: 600;
    font-size: 12px;
    animation: ${colorAnim} 2s infinite;
`;

const ScrollDown = () => {
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <StraightLine />
            <ScrollText>Please scroll down</ScrollText>
            <Arrow />
        </Stack>
    );
};

const About: React.FC = () => {
    const dispatch = useAppDispatch();
    const menuReducers = useAppSelector((state) => state.menuReducers);
    const element = useRef<HTMLElement>(null);
    useEffect(() => {
        dispatch(setState("about"));
    }, []);

    useEffect(() => {
        let opacityNum: number = 0,
            zIndex: number = 0;
        if (menuReducers.isClick) {
            opacityNum = 0;
            zIndex = 0;
        } else {
            opacityNum = 1;
            zIndex = 2;
        }
        gsap.context(() => {
            gsap.fromTo(
                element.current,
                {
                    opacity: 0,
                },
                {
                    delay: 0.5,
                    opacity: opacityNum,
                    zIndex: zIndex,
                    duration: 1,
                }
            );
        }, element);
    }, [menuReducers.isClick]);

    return (
        <Box
            component="div"
            maxWidth="lg"
            style={{
                height: "calc(100% - 90px)",
                margin: "auto",
                overflow: "auto",
                position: "relative",
                zIndex: 2,
            }}
            ref={element}
        >
            <Stack
                direction="column"
                height="80%"
                alignItems="flex-start"
                justifyContent="flex-end"
                maxWidth="md"
                margin="auto"
                id="whoami"
            >
                <Stack
                    direction="column"
                    height="70%"
                    alignItems="flex-start"
                    justifyContent="space-between"
                >
                    <Box>
                        <Typo variant="h3" letspacing="2px" weight={200}>
                            ― WHO AM I
                        </Typo>
                        <Box paddingTop={4}>
                            <Typo variant="h1" letspacing="1px" weight={700}>
                                張哲瑜
                            </Typo>
                        </Box>
                        <Box paddingTop={2} marginBottom={2}>
                            <Typo
                                variant="h3"
                                letspacing="1px"
                                weight={500}
                                lineHeight="40px"
                            >
                                畢業於國立臺中科技大學資訊管理系，勇於嘗試各種技術，過去接觸過
                                Unity
                                遊戲引擎開發、互動網頁開發，透過不斷實戰累積經驗，努力成為一個全方位的人。
                            </Typo>
                        </Box>
                    </Box>
                </Stack>
                <ScrollDown />
            </Stack>
            <Stack
                direction="column"
                height="80%"
                alignItems="flex-start"
                justifyContent="flex-end"
                maxWidth="md"
                margin="auto"
                id="workexperience"
            >
                <Stack
                    direction="column"
                    height="70%"
                    alignItems="flex-start"
                    justifyContent="space-between"
                >
                    <Box>
                        <Typo variant="h3" letspacing="2px" weight={200}>
                            ― Work Experience
                        </Typo>
                        <Box paddingTop={2}>
                            <Stack direction="column" spacing={0.5}>
                                <Typo
                                    variant="h3"
                                    letspacing="1px"
                                    weight={700}
                                    lineHeight="40px"
                                >
                                    網頁前端工程師
                                </Typo>
                                <Typo
                                    variant="h4"
                                    letspacing="1px"
                                    weight={500}
                                >
                                    環耀實境有限公司
                                </Typo>
                                <Typo
                                    variant="h5"
                                    letspacing="1px"
                                    weight={500}
                                >
                                    2021/03 ~ 2022/05
                                </Typo>
                                <Typo
                                    variant="h5"
                                    letspacing="1px"
                                    weight={500}
                                >
                                    環景網頁製作、互動網頁開發
                                </Typo>
                            </Stack>
                        </Box>
                        <Box paddingTop={2}>
                            <Stack direction="column" spacing={0.5}>
                                <Typo
                                    variant="h3"
                                    letspacing="1px"
                                    weight={700}
                                    lineHeight="40px"
                                >
                                    Unity3D 工程師
                                </Typo>
                                <Typo
                                    variant="h4"
                                    letspacing="1px"
                                    weight={500}
                                >
                                    穎利科研國際事業有限公司
                                </Typo>
                                <Typo
                                    variant="h5"
                                    letspacing="1px"
                                    weight={500}
                                >
                                    2020/08 ~ 2020/12
                                </Typo>
                                <Typo
                                    variant="h5"
                                    letspacing="1px"
                                    weight={500}
                                >
                                    虛擬會議平台開發
                                </Typo>
                            </Stack>
                        </Box>
                    </Box>
                </Stack>
                <ScrollDown />
            </Stack>
            <Stack
                direction="column"
                height="100%"
                alignItems="flex-start"
                justifyContent="flex-end"
                maxWidth="md"
                margin="auto"
                id="skill"
            >
                <Stack
                    direction="column"
                    height="70%"
                    alignItems="flex-start"
                    justifyContent="space-between"
                >
                    <Box>
                        <Typo variant="h3" letspacing="2px" weight={200}>
                            ― Skill
                        </Typo>
                        <Box paddingTop={2}>
                            <Stack direction="column" spacing={1}>
                                <Typo
                                    variant="h3"
                                    letspacing="1px"
                                    weight={700}
                                    lineHeight="40px"
                                >
                                    Web development
                                </Typo>
                                <Stack direction="column" spacing={0.5}>
                                    <Typo
                                        variant="h4"
                                        letspacing="1px"
                                        weight={400}
                                        lineHeight="25px"
                                    >
                                        Basics：HTML｜CSS｜RWD｜jQuery｜JavaScript｜TypeScript
                                    </Typo>
                                    <Typo
                                        variant="h4"
                                        letspacing="1px"
                                        weight={400}
                                        lineHeight="25px"
                                    >
                                        Styling：SCSS｜CSS in
                                        JS｜Styled-Component
                                    </Typo>
                                    <Typo
                                        variant="h4"
                                        letspacing="1px"
                                        weight={400}
                                        lineHeight="25px"
                                    >
                                        UI Frameworks：Material ui
                                    </Typo>
                                    <Typo
                                        variant="h4"
                                        letspacing="1px"
                                        weight={400}
                                        lineHeight="25px"
                                    >
                                        Frontend Frameworks：React Hooks
                                    </Typo>
                                    <Typo
                                        variant="h4"
                                        letspacing="1px"
                                        weight={400}
                                        lineHeight="25px"
                                    >
                                        Backend Frameworks：Express
                                    </Typo>
                                    <Typo
                                        variant="h4"
                                        letspacing="1px"
                                        weight={400}
                                        lineHeight="25px"
                                    >
                                        Database：MySQL
                                    </Typo>
                                    <Typo
                                        variant="h4"
                                        letspacing="1px"
                                        weight={400}
                                        lineHeight="25px"
                                    >
                                        WebGL：THREE.js | Krpano
                                    </Typo>
                                    <Typo
                                        variant="h4"
                                        letspacing="1px"
                                        weight={400}
                                        lineHeight="25px"
                                    >
                                        Animation：GreenSock
                                    </Typo>
                                </Stack>
                            </Stack>
                        </Box>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    );
};

export default About;
