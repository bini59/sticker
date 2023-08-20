import { create } from "zustand";

export const useStickerStore = create((set) => ({
    id: 1,
    stickers: [],
    addSticker: () => {
        set((state) => ({
            stickers: [
                ...state.stickers,
                {
                    id: state.id + 1,
                    src: "https://picsum.photos/320/240",
                    zIndex: state.stickers.length + 1,
                    state: false,
                },
            ],
            id: state.id + 1,
        }));
    },
    removeSticker: (id) => {
        set((state) => ({
            stickers: state.stickers.filter((sticker) => sticker.id !== id),
        }));
    },
    onclick: (id) => {
        set((state) => ({
            stickers: state.stickers.map((sticker) => {
                if (sticker.id === id) {
                    return {
                        ...sticker,
                        zIndex: state.stickers.length + 1,
                        state: true,
                    };
                } else {
                    return {
                        ...sticker,
                        state: false,
                    };
                }
            }),
        }));
    },
}));