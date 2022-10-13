import { useEffect } from "react";
import { setState } from "../slices/menu";
import { useAppDispatch } from "../hooks";

const Home = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setState("home"));
    }, []);
    return <div></div>;
};

export default Home;
