import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Stack } from "@mui/material";
import color from "../data/color";
import { setHover } from "../slices/cursor";
import { useAppDispatch, useAppSelector } from "../hooks";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const MenuContainer = styled(Stack)`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    box-sizing: border-box;
`;
type item = {
    isSelect?: boolean;
};
const Item = styled.div<item>`
    color: ${color.common.black};
    font-weight: 400;
    letter-spacing: 5px;
    text-decoration: ${(props) =>
        props.isSelect === true ? "line-through" : ""};
    pointer-events: ${(props) => (props.isSelect === true ? "none" : "auto")};
    opacity: 1;
`;

const Menu = () => {
    const n = useNavigate();
    const dispatch = useAppDispatch();
    const menuReducers = useAppSelector((state) => state.menuReducers);
    const handleMouseOver = () => {
        dispatch(setHover(true));
    };
    const handleMouseOut = () => {
        dispatch(setHover(false));
    };

    const element = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!menuReducers.isClick) return;
        gsap.context(() => {
            gsap.timeline()
                .from("#home", { x: 20, opacity: 0, duration: 0.5 }, 0)
                .from("#about", { x: 20, opacity: 0, duration: 0.5 }, ">-.3")
                .from("#works", { x: 20, opacity: 0, duration: 0.5 }, ">-.3");
        }, element);
    }, [menuReducers.isClick]);

    return (
        <MenuContainer
            ref={element}
            alignItems="center"
            justifyContent="center"
            spacing={2}
            style={{
                display: menuReducers.isClick ? "flex" : "none",
            }}
        >
            <Item
                id="home"
                isSelect={menuReducers.state === "home" ? true : false}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={() => n("/Portfolio/")}
            >
                HOME
            </Item>
            <Item
                id="about"
                isSelect={menuReducers.state === "about" ? true : false}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={() => n("/Portfolio/about")}
            >
                ABOUT
            </Item>
            <Item
                id="works"
                isSelect={menuReducers.state === "works" ? true : false}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={() => n("/Portfolio/works")}
            >
                WORKS
            </Item>
        </MenuContainer>
    );
};

export default Menu;
