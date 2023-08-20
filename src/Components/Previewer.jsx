import { Sticker } from "./Sticker"
import { useStickerStore } from "../store/useStickerStore"
import { useRef, useEffect } from "react";

import { useRefStore } from "../store/useRefStore";

export const Previewer = () => {
    const { stickers, onclick, removeSticker } = useStickerStore();
    const { setRef } = useRefStore();
    const containerRef = useRef(null);

    useEffect(() => {
        setRef(containerRef);
    }, [containerRef])
    
    const containerBounds = {
        left: 0,
        top: 0,
        right: containerRef.current?.clientWidth,
        bottom: containerRef.current?.clientHeight
    }
    

    return (
        <section className="sticker-section" ref={containerRef}>
            {stickers.map((sticker) => (
				<Sticker
					key={sticker.id}
					src={sticker.src}
					zIndex={sticker.zIndex}
                    state={sticker.state}
                    bounds={containerBounds}
					onclick={() => onclick(sticker.id)}
					removeSticker={() => removeSticker(sticker.id)}
				/>
			))}
        </section>
    )
}