import { useEffect, useState } from "react"

import { FileSelect } from "./FileSelect";
import { FileViewer } from "./FileViewer";

export const Files = () => {
    const [img, setImg] = useState([]);

    useEffect(() => {
        console.log(img)
    }, [img])
        


    return (
        <section className="file-section">
            <FileViewer imgs={img} />
            <FileSelect setImg={setImg} />
        </section>
    )
}