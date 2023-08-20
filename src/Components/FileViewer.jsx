import { useEffect } from "react";
import { useStickerStore } from "../store/useStickerStore"

export const FileViewer = ({ imgs }) => {
    const { stickers, addSticker } = useStickerStore();
    useEffect(() => {
        console.log(stickers)
    }, [stickers])


    return (
        <section className="img-section">
            {imgs.map((img, idx) => (
                <div className="img-box" key={idx}>
                    <img src={img.src} onClick={()=>addSticker(img.src)} alt="img" />
                </div>
            ))}
        </section>
    )
}