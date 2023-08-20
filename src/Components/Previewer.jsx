import { Sticker } from "./Sticker"
import { useStickerStore } from "../store/useStickerStore"
import { useRef, useEffect } from "react";

import { useRefStore } from "../store/useRefStore";

export const Previewer = () => {
    const { stickers, onclick, removeSticker, removeState } = useStickerStore();
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

    const onClick = (e) => {
        if (e.target === containerRef.current) {   
            removeState();
        }
    }
    

    return (
        <section className="sticker-section" ref={containerRef} onClick={onClick}>
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