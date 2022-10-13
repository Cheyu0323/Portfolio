import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    isClick: boolean;
    state: string;
};

const initialState: InitialState = {
    isClick: false,
    state: "home",
};

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setClick: (state, action) => {
            state.isClick = action.payload;
        },
        setState: (state, action) => {
            state.state = action.payload;
            state.isClick = false;
        },
    },
});

export const { setClick, setState } = menuSlice.actions;
export default menuSlice.reducer;
