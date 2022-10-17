import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    isLoading: boolean;
};

const initialState: InitialState = {
    isLoading: true,
};

export const loadingrSlice = createSlice({
    name: "load",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setLoading } = loadingrSlice.actions;
export default loadingrSlice.reducer;
