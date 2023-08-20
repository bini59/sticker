import { Sticker } from "./Sticker"
import { useStickerStore } from "../store/useStickerStore"

export const Previewer = () => {
    const { stickers, onclick, removeSticker } = useStickerStore();

    return (
        <section className="sticker-section">
            {stickers.map((sticker) => (
				<Sticker
					key={sticker.id}
					src={sticker.src}
					zIndex={sticker.zIndex}
					state={sticker.state}
					onclick={() => onclick(sticker.id)}
					removeSticker={() => removeSticker(sticker.id)}
				/>
			))}
        </section>
    )
}