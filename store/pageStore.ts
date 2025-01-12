import { create } from "zustand";

type PageStoreType = {
    isMenuDisplay: boolean;
    currentClick: "/" | "about" | "works";
    handleIsMenuDisplay: (isDisplay: boolean) => void;
    handelSetCurrentClick: (name: "/" | "about" | "works") => void;
};

const usePageStore = create<PageStoreType>((set) => ({
    isMenuDisplay: false,
    currentClick: "/",
    handleIsMenuDisplay: (isDisplay) => set({ isMenuDisplay: isDisplay }),
    handelSetCurrentClick: (name) => set({ currentClick: name }),
}));

export default usePageStore;
