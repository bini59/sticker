import { useRef } from "react"

export const FileSelect = ({ setImg }) => {
    const ref = useRef(null);

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

    return (
        <section className="file-select">
            <button className="select-btn" onClick={()=>ref.current.click()}>파일 추가 +</button>
            <input type="file" ref={ref} className="select-input" onChange={filesSelect} multiple/>
        </section>
    )
}