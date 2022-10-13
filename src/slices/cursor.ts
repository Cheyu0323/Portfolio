import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    isHover: boolean;
};

const initialState: InitialState = {
    isHover: false,
};

export const cursorSlice = createSlice({
    name: "cursor",
    initialState,
    reducers: {
        setHover: (state, action) => {
            state.isHover = action.payload;
        },
    },
});

export const { setHover } = cursorSlice.actions;
export default cursorSlice.reducer;
