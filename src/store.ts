import { configureStore } from "@reduxjs/toolkit";
import cursorReducers from "./slices/cursor";
import menuReducers from "./slices/menu";
import loadingReducers from "./slices/loading";
import { combineReducers } from "redux";
const reducers = combineReducers({
    cursorReducers: cursorReducers,
    menuReducers: menuReducers,
    loadingReducers: loadingReducers
});
const store = configureStore({
    reducer: reducers,
});
export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
export default store;
