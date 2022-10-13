import { useEffect, useRef } from "react";
import { setState } from "../slices/menu";
import { setHover } from "../slices/cursor";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Box, Stack, Grid } from "@mui/material";
import workInfo from "../data/worksInfo";
import styled from "@emotion/styled";
import color from "../data/color";
import Typo from "../components/Typo";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

type image = {
    link?: string;
};
const Image = styled(Box)<image>`
    && {
        background-image: url(${(props) => props.link});
        background-size: cover;
        position: relative;
        box-shadow: 1.5px 1.5px 7px ${color.primary.light};
        display: block;
        &::before {
            content: "";
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            background-color: rgba(64, 64, 64, 0.5);
            transition: 0.3s;
        }
        &::after {
            content: "view";
            position: absolute;
            top: 50%;
            left: 50%;
            opacity: 0;
            transform: translate(-50%, -50%);
            color: ${color.common.white};
            transition: 0.3s;
        }
    }
`;

type imageItem = {
    isDesktop: boolean;
    image: string;
};
const ImageItem: React.FC<imageItem> = ({ isDesktop, image }) => {
    return (
        <Box
            style={{
                display: "table-cell",
                height: "100%",
                width: isDesktop === true ? "53.5%" : "20%",
            }}
        >
            <Image
                style={{
                    paddingTop: isDesktop === true ? "61%" : "163%",
                    marginLeft: isDesktop === true ? "0%" : "8%",
                }}
                component="span"
                link={process.env.PUBLIC_URL + image}
            />
        </Box>
    );
};

const ImageContainer = styled(Box)`
    && {
        &:hover {
            span {
                &::before {
                    opacity: 1;
                }
                &::after {
                    opacity: 1;
                    letter-spacing: 2px;
                }
            }
        }
    }
`;

const Work = () => {
    const n = useNavigate();
    const dispatch = useAppDispatch();
    const menuReducers = useAppSelector((state) => state.menuReducers);
    const element = useRef<HTMLElement>(null);
    useEffect(() => {
        dispatch(setState("works"));
    }, []);
    const handleMouseOver = () => {
        dispatch(setHover(true));
    };
    const handleMouseOut = () => {
        dispatch(setHover(false));
    };
    const hasMobileArray = workInfo.filter(
        (item) => item.pics.mobile !== undefined
    );
    const onlyDesktopArray = workInfo.filter(
        (item) => item.pics.mobile === undefined
    );
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
            spacing={5}
            ref={element}
        >
            {hasMobileArray.map((item) => {
                return (
                    <Stack direction="column" spacing={1.2} key={item.id}>
                        <ImageContainer
                            height="100%"
                            width="100%"
                            display="table"
                            onClick={() => {
                                n("/Portfolio/works/" + item.name);
                            }}
                        >
                            <ImageItem
                                isDesktop={true}
                                image={item.pics.desktop[0].item}
                            />
                            {item.pics.mobile !== undefined && (
                                <ImageItem
                                    isDesktop={false}
                                    image={item.pics.mobile[0].item}
                                />
                            )}
                        </ImageContainer>
                        <Box>
                            <Typo
                                variant="h4"
                                weight={400}
                                letspacing="1.5px"
                                lineHeight="25px"
                                onMouseOver={handleMouseOver}
                                onMouseOut={handleMouseOut}
                                onClick={() => {
                                    n("/Portfolio/works/" + item.name);
                                }}
                                style={{
                                    display: "inline",
                                }}
                            >
                                {item.title}
                            </Typo>
                            <Typo
                                variant="h5"
                                weight={300}
                                letspacing="1px"
                                lineHeight="20px"
                            >
                                {item.types.map((ele) => (
                                    <span key={ele.id}>{ele.item}</span>
                                ))}
                            </Typo>
                            {item.url !== undefined && (
                                <Typo
                                    variant="h5"
                                    weight={300}
                                    letspacing="1px"
                                    lineHeight="10px"
                                    onMouseOver={handleMouseOver}
                                    onMouseOut={handleMouseOut}
                                    style={{
                                        display: "inline",
                                    }}
                                >
                                    <a href={item.url} target="_blank">
                                        {item.url}
                                    </a>
                                </Typo>
                            )}
                        </Box>
                    </Stack>
                );
            })}
            <Grid container>
                {onlyDesktopArray.map((item) => {
                    return (
                        <Grid
                            key={item.id}
                            item
                            xs={6}
                            sm={6}
                            md={6}
                            marginY={1.5}
                        >
                            <ImageContainer width="100%">
                                <Image
                                    style={{
                                        paddingTop: "58%",
                                        marginRight:
                                            item.id % 2 !== 1 ? "1.5%" : "0%",
                                        marginLeft:
                                            item.id % 2 === 1 ? "1.5%" : "0%",
                                    }}
                                    component="span"
                                    link={
                                        process.env.PUBLIC_URL +
                                        item.pics.desktop[0].item
                                    }
                                    onClick={() => {
                                        n("/Portfolio/works/" + item.name);
                                    }}
                                />
                            </ImageContainer>
                            <Box marginTop={1.2}>
                                <Typo
                                    variant="h4"
                                    weight={400}
                                    letspacing="1.5px"
                                    lineHeight="25px"
                                    onMouseOver={handleMouseOver}
                                    onMouseOut={handleMouseOut}
                                    style={{
                                        display: "inline",
                                    }}
                                >
                                    {item.title}
                                </Typo>
                                <Typo
                                    variant="h5"
                                    weight={300}
                                    letspacing="1px"
                                    lineHeight="20px"
                                >
                                    {item.types.map((ele) => (
                                        <span key={ele.id}>{ele.item}</span>
                                    ))}
                                </Typo>
                                {item.url !== undefined && (
                                    <Typo
                                        variant="h5"
                                        weight={300}
                                        letspacing="1px"
                                        lineHeight="10px"
                                        onMouseOver={handleMouseOver}
                                        onMouseOut={handleMouseOut}
                                        style={{
                                            display: "inline",
                                        }}
                                    >
                                        {item.url}
                                    </Typo>
                                )}
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
        </Stack>
    );
};

export default Work;
