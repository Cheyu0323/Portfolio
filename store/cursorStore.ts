import { create } from "zustand";

type CursorStoreType = {
    isHover: boolean;
    handleIsHover: (isHover: boolean) => void;
};

const useCursorStore = create<CursorStoreType>((set) => ({
    isHover: false,
    handleIsHover: (isHover) => set({ isHover: isHover }),
}));

export default useCursorStore;
