import { Stack, Typography, Box } from "@mui/material";
import styled from "styled-components";
import color from "../data/color";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setHover } from "../slices/cursor";
import { setClick } from "../slices/menu";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const Type = styled(Typography)`
    && {
        letter-spacing: 10px;
        font-weight: 100;
        display: inline;
    }
`;

const Line = styled.span`
    width: 100%;
    height: 1px;
    background-color: ${color.common.black};
    margin: 4px 0;
    position: relative;
    &:not(:last-child) {
        &::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 1px;
            background-color: ${color.primary.light};
            transform: rotate(-12deg);
            top: 5px;
            transition: transform 0.5s;
        }
    }
`;

const MenuBtnContainer = styled(Stack)`
    cursor: pointer;
    overflow: hidden;
    &:hover {
        span {
            &:not(:last-child) {
                &::after {
                    transform: rotate(-12deg) translate(50px);
                }
            }
        }
    }
    &.active {
        span {
            &::after {
                display: none;
            }
        }
    }
`;

type menuBtn = {
    onMouseOver: () => void;
    onMouseOut: () => void;
};

const MenuBtn: React.FC<menuBtn> = ({ onMouseOver, onMouseOut }) => {
    const dispatch = useAppDispatch();
    const menuReducers = useAppSelector((state) => state.menuReducers);
    const line1 = useRef<HTMLElement>(null);
    const line2 = useRef<HTMLElement>(null);
    const line3 = useRef<HTMLElement>(null);

    const element = useRef<HTMLElement>(null);
    const menuTimeline = useRef<GSAPTimeline>();

    useEffect(() => {
        const ctx = gsap.context(() => {
            menuTimeline.current && menuTimeline.current.progress(0).kill();
            menuTimeline.current = gsap
                .timeline({
                    defaults: {
                        ease: "Linear.easeNone",
                    },
                })
                .to(line1.current, { margin: 0, duration: 0.3 }, 0)
                .to(line2.current, { margin: 0, duration: 0.3 }, 0)
                .to(line3.current, { margin: 0, duration: 0.3 }, 0)
                .to(line2.current, { opacity: 0, duration: 0.3 }, 0)
                .to(line1.current, { y: 0, rotation: 45, duration: 0.3 }, 0.3)
                .to(
                    line3.current,
                    { y: -1.5, rotation: -45, duration: 0.3 },
                    0.3
                );
        }, element);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        menuTimeline.current?.reversed(!menuReducers.isClick);
    }, [menuReducers.isClick]);

    const handleMenuClick = () => {
        dispatch(setClick(!menuReducers.isClick));
    };

    return (
        <MenuBtnContainer
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onClick={handleMenuClick}
            direction="column"
            className={menuReducers.isClick ? "active" : ""}
            width="35px"
            height="28px"
            alignItems="center"
            justifyContent="center"
            ref={element}
        >
            <Line ref={line1} />
            <Line ref={line2} />
            <Line ref={line3} />
        </MenuBtnContainer>
    );
};

const Header: React.FC = () => {
    const n = useNavigate();
    const dispatch = useAppDispatch();
    const handleMouseOver = () => {
        dispatch(setHover(true));
    };
    const handleMouseOut = () => {
        dispatch(setHover(false));
    };
    return (
        <Stack
            paddingTop={5}
            paddingBottom={2.5}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            position="sticky"
            top="0"
            width="100%"
            sx={{
                zIndex: "900",
                boxSizing: "border-box",
            }}
        >
            <Box>
                <Type
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    onClick={() => {
                        n("/Portfolio/");
                    }}
                >
                    CHEYU
                </Type>
            </Box>
            <Box>
                <MenuBtn
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                />
            </Box>
        </Stack>
    );
};

export default Header;
