import { useRef } from "react"
import { useRefStore } from "../store/useRefStore";

import html2canvas from "html2canvas";

export const FileSelect = ({ setImg }) => {
    const ref = useRef(null);

    const dRef = useRefStore().ref;

    const filesSelect = (e) => {
        const files = e.target.files;
        const filesArr = Array.prototype.slice.call(files);

        filesArr.forEach((file) => {
            if (!file.type.match("image.*")) {
                alert("이미지 파일만 업로드 가능합니다.");
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    setImg((prev) => [...prev, {
                        src: img.src,
                    }])
                }
                img.src = e.target.result;
            }
            reader.readAsDataURL(file);
        })
    }

    const download = async () => {
        const canvas = await html2canvas(dRef?.current);
        const link = document.createElement("a");
        link.download = "image.png";
        link.href = canvas.toDataURL();
        link.click();
    }

    return (
        <section className="file-select">
            <div className="button-section">
                <button className="btn select-btn" onClick={() => ref.current.click()}>파일 추가 +</button>
                <button className="btn download-btn" onClick={()=>{download()}}>다운로드</button>
            </div>
            
            <input type="file" ref={ref} className="select-input" onChange={filesSelect} multiple/>
        </section>
    )
}