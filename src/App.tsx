import Model from "./components/Model";
import Cursor from "./components/Cursor";
import color from "./data/color";
import Header from "./components/Header";
import { Box, Stack, createTheme, ThemeProvider } from "@mui/material";
import useWindowSize from "./customHooks/useWindowSize";
import Menu from "./components/Menu";
import About from "./page/About";
import Home from "./page/Home";
import Work from "./page/Work";
import WorkItem from "./page/WorkItem";
import { RouteObject, useRoutes } from "react-router-dom";

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
        path: "/Portfolio/",
        element: <Home />,
    },
    {
        path: "/Portfolio/about",
        element: <About />,
    },
    {
        path: "/Portfolio/works",
        element: <Work />,
    },
    {
        path: "/Portfolio/works/:title",
        element: <WorkItem />,
    },
];

const App = () => {
    const windowSize = useWindowSize();
    const element = useRoutes(routerConfig);

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
