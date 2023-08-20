import { create } from "zustand";

export const useStickerStore = create((set) => ({
    id: 1,
    stickers: [],
    zIndex: 1,

    // 스티커를 추가하는 함수, id를 통해 스티커를 구분한다.
    addSticker: (src) => {
        set((state) => ({
            stickers: [
                ...state.stickers,
                {
                    id: state.id + 1,
                    src: src,
                    zIndex: state.zIndex + 1,
                    state: false,
                },
            ],
            id: state.id + 1,
            zIndex: state.zIndex + 1,
        }));
    },

    // 스티커를 제거하는 함수, id를 통해 스티커를 구분한다.
    removeSticker: (id) => {
        set((state) => ({
            stickers: state.stickers.filter((sticker) => sticker.id !== id),
        }));
    },

    // 스티커를 클릭할 때 실행되는 함수.
    // 스티커의 zIndex를 변경하고, state를 true로 변경한다.
    // state가 true인 스티커는 크기조절, 이동, 회전, 삭제 등의 기능을 사용할 수 있다.
    onclick: (id) => {
        set((state) => ({
            stickers: state.stickers.map((sticker) => {
                if (sticker.id === id) {
                    return {
                        ...sticker,
                        zIndex: state.zIndex + 1,
                        state: true,
                    };
                } else {
                    return {
                        ...sticker,
                        state: false,
                    };
                }
            }),
            zIndex: state.zIndex + 1,
        }));
    },
}));