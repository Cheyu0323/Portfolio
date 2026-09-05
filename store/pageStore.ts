import { create } from "zustand";

type PageName = "/" | "about" | "works";

type PageStoreType = {
    isMenuDisplay: boolean;

    currentClick: PageName;

    handleIsMenuDisplay: (isDisplay: boolean) => void;

    handelSetCurrentClick: (name: PageName) => void;

    /*
     * Route 真正切換完成後使用。
     *
     * currentClick + menu 一次更新，
     * 避免產生中間 frame。
     */
    handleRouteChange: (name: PageName) => void;
};

const usePageStore = create<PageStoreType>((set) => ({
    isMenuDisplay: false,

    currentClick: "/",

    handleIsMenuDisplay: (isDisplay) =>
        set({
            isMenuDisplay: isDisplay,
        }),

    handelSetCurrentClick: (name) =>
        set({
            currentClick: name,
        }),

    handleRouteChange: (name) =>
        set((state) => {
            /*
             * 如果狀態根本沒變，
             * 就不要重新 render。
             */
            if (state.currentClick === name && !state.isMenuDisplay) {
                return state;
            }

            return {
                ...state,

                currentClick: name,

                isMenuDisplay: false,
            };
        }),
}));

export default usePageStore;
