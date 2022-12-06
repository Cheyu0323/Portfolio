import { Box, Stack, createTheme, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import Model from "./components/Model";
import Cursor from "./components/Cursor";
import color from "./data/color";
import Header from "./components/Header";
import useWindowSize from "./customHooks/useWindowSize";
import Menu from "./components/Menu";
import About from "./page/About";
import Home from "./page/Home";
import Work from "./page/Work";
import WorkItem from "./page/WorkItem";
import ReactGA from "react-ga4";

const theme = createTheme({
    typography: {
        fontFamily:
            "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;400;500;900&display=swap",
        h3: {
            "@media (max-width:600px)": {
                fontSize: "1.1rem",
            },
        },
        h4: {
            "@media (max-width:600px)": {
                fontSize: "0.9rem",
            },
        },
        h5: {
            "@media (max-width:600px)": {
                fontSize: "0.7rem",
            },
        },
        body2: {
            "@media (max-width:600px)": {
                fontSize: "0.9rem",
            },
        },
    },
});

const routerConfig: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/about",
        element: <About />,
    },
    {
        path: "/works",
        element: <Work />,
    },
    {
        path: "/works/:title",
        element: <WorkItem />,
    },
];

const App: React.FC = () => {
    const windowSize = useWindowSize();
    const element = useRoutes(routerConfig);
    ReactGA.initialize("G-8VYTXWV4B0");
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page_title: window.location.pathname + window.location.search });
    }, [element]);

    return (
        <ThemeProvider theme={theme}>
            <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                    height: windowSize.height + "px",
                    backgroundColor: color.common.white,
                }}
            >
                <Box
                    component="div"
                    width="90%"
                    height="100%"
                    sx={{
                        margin: "auto",
                    }}
                >
                    <Header />
                    <Cursor />
                    <Menu />
                    <Model />
                    {element}
                </Box>
            </Stack>
        </ThemeProvider>
    );
};

export default App;
