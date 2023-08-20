import create from "zustand";

export const useRefStore = create((set) => ({
    ref: null,
    setRef: (ref) => {
        set(() => ({
            ref: ref,
        }));
    },
}));