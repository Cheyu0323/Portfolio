import { useEffect, useRef } from "react";
import { Box, Stack } from "@mui/material";
import Typo from "../components/Typo";
import { setState } from "../slices/menu";
import { setHover } from "../slices/cursor";
import { useAppDispatch, useAppSelector } from "../hooks";
import workInfo from "../data/worksInfo";
import color from "../data/color";
import gsap from "gsap";
import { useParams, useNavigate } from "react-router-dom";

const WorkItem = () => {
    const paramsTitle = useParams().title;
    const n = useNavigate();
    const workIndex = workInfo.findIndex((item) => item.name === paramsTitle);
    const workItem = workInfo[workIndex];
    const workPreItem = workInfo[workIndex - 1];
    const workNextItem = workInfo[workIndex + 1];

    const dispatch = useAppDispatch();
    const menuReducers = useAppSelector((state) => state.menuReducers);
    const element = useRef<HTMLElement>(null);
    useEffect(() => {
        dispatch(setState("works"));
    }, []);
    useEffect(() => {
        element.current?.scrollTo({
            top: 0,
        });
    }, [paramsTitle]);
    const handleMouseOver = () => {
        dispatch(setHover(true));
    };
    const handleMouseOut = () => {
        dispatch(setHover(false));
    };
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
        <Stack
            style={{
                height: "calc(100% - 90px)",
                margin: "auto",
                overflow: "auto",
                position: "relative",
                zIndex: 2,
            }}
            direction="column"
            maxWidth="md"
            spacing={{ xs: 2, sm: 3 }}
            ref={element}
        >
            <Typo
                variant="h3"
                weight={500}
                letspacing="1.5px"
                lineHeight="25px"
                style={{
                    display: "inline",
                    marginTop: "20px",
                }}
            >
                {workItem.title}
            </Typo>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 8 }}
            >
                <Box>
                    <Typo variant="body2" weight={400} letspacing="1.5px">
                        Type
                    </Typo>
                    <Typo variant="body2" weight={300} letspacing="1.5px">
                        {workItem.types.map((ele) => (
                            <span key={ele.id}>{ele.item}</span>
                        ))}
                    </Typo>
                </Box>
                {workItem.url !== undefined && (
                    <Box>
                        <Typo variant="body2" weight={400} letspacing="1.5px">
                            URL
                        </Typo>
                        <Typo
                            variant="body2"
                            weight={300}
                            letspacing="1.5px"
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                            noWrap
                            style={{
                                wordBreak: "break-word",
                            }}
                        >
                            <a href={workItem.url} target="_blank">
                                {workItem.url}
                            </a>
                        </Typo>
                    </Box>
                )}
                <Box>
                    <Typo variant="body2" weight={400} letspacing="1.5px">
                        TECHNOLOGY
                    </Typo>
                    <Typo variant="body2" weight={300} letspacing="1.5px">
                        {workItem.technologys.map((ele) => (
                            <span key={ele.id} style={{ marginRight: "10px" }}>
                                {ele.item}
                            </span>
                        ))}
                    </Typo>
                </Box>
            </Stack>
            {workItem.pics.desktop.map((ele) => (
                <Box
                    key={ele.id}
                    width="100%"
                    component="img"
                    style={{
                        boxShadow: `1.5px 1.5px 7px ${color.primary.light}`,
                    }}
                    src={process.env.PUBLIC_URL + ele.item}
                />
            ))}
            {workItem.pics.mobile !== undefined && (
                <Stack direction="row" justifyContent="space-between">
                    {workItem.pics.mobile.map((ele) => (
                        <Box
                            key={ele.id}
                            width="30%"
                            component="img"
                            style={{
                                boxShadow: `1.5px 1.5px 7px ${color.primary.light}`,
                            }}
                            src={process.env.PUBLIC_URL + ele.item}
                        />
                    ))}
                </Stack>
            )}
            <Stack
                direction="row"
                justifyContent="space-around"
                paddingY={{ xs: 1, sm: 5 }}
            >
                <Typo
                    variant="body2"
                    style={{
                        display: "inline",
                        textDecoration: "underline",
                        pointerEvents:
                            workPreItem !== undefined ? "auto" : "none",
                    }}
                    weight={300}
                    letspacing="1px"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    onClick={() => {
                        n("/Portfolio/works/" + workPreItem.name);
                    }}
                >
                    {workPreItem !== undefined && "PREV"}
                </Typo>
                <Typo
                    variant="body2"
                    style={{
                        display: "inline",
                        textDecoration: "underline",
                    }}
                    weight={300}
                    letspacing="1px"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    onClick={() => {
                        n("/Portfolio/works");
                        handleMouseOut();
                    }}
                >
                    INDEX
                </Typo>
                <Typo
                    variant="body2"
                    style={{
                        display: "inline",
                        textDecoration: "underline",
                        pointerEvents:
                            workNextItem !== undefined ? "auto" : "none",
                    }}
                    weight={300}
                    letspacing="1px"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    onClick={() => {
                        n("/Portfolio/works/" + workNextItem.name);
                    }}
                >
                    {workNextItem !== undefined && "NEXT"}
                </Typo>
            </Stack>
        </Stack>
    );
};

export default WorkItem;
