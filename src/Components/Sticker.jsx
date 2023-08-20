import { useEffect, useRef, useState } from "react";

import {
    makeMoveable,
    Rotatable,
    Draggable,
    Scalable
} from "react-moveable";
import MoveableHelper from "moveable-helper";

const Moveable = makeMoveable([
    Draggable,
    Scalable,
    Rotatable
]);

export const Sticker = ({state, zIndex, src, bounds, onclick, removeSticker}) => {
    const [helper] = useState(() => {
        return new MoveableHelper();
    });
    const ref = useRef(null);
    const btnRef = useRef(null);

    const [rect, setRect] = useState({
        left: ref.current?.offsetWidth,
        top: 120,
    });

    useEffect(() => {
        setRect({
            left: ref.current?.offsetWidth+80,
            top: 120,
        })
    }, [ref.current?.offsetWidth])

    const onDrag = (e) => {
        // check bounds
        const { left, top, right, bottom } = bounds;
        const target = e.target;
        const translate = e.translate;
        const { width, height } = e.target.getBoundingClientRect();

        const nowLeft = 100 + translate[0] -
            (width - target.offsetWidth) / 2;
        const nowTop = 150 + translate[1] -
            (height - target.offsetHeight) / 2;
        const nowRight = nowLeft + width;
        const nowBottom = nowTop + height;

        let flag = true;
        
        if(nowLeft < left) {
            e.translate[0] = left - 100 + (width - target.offsetWidth) / 2;
            flag = false;
        }
        if (nowTop < top) {
            e.translate[1] = top - 150 + (height - target.offsetHeight) / 2;
            flag = false;
        }
        if (nowRight > right) {
            e.translate[0] = right - target.offsetWidth - 100 - (width - target.offsetWidth) / 2;
            flag = false;
        }
        if (nowBottom > bottom) {
            e.translate[1] = bottom - target.offsetHeight - 150 - (height - target.offsetHeight) / 2;
            flag = false;
        }
        helper.onDrag(e);
    }

    const onResize = (e) => {

        function extractScaleValues(transformString) {
            const scaleMatch = transformString.match(/scale\(([^,]+), ([^)]+)\)/);
        
            if (scaleMatch && scaleMatch.length === 3) {
                const scaleX = parseFloat(scaleMatch[1]);
                const scaleY = parseFloat(scaleMatch[2]);
                return { scaleX, scaleY };
            } else {
                return null;
            }
        }

        helper.onScale(e);
        const { scaleX, scaleY } = extractScaleValues(ref.current.style.transform);
        btnRef.current.style.transform = `scale(${1 / scaleX}, ${1 / scaleY})`;
        btnRef.current.style.top = `${ -30 - (1 / scaleY) * 10}px`;
    }

    return (
        <div className="container" style={{ zIndex: zIndex, position: "relative" }} >
            
            <div className="target" ref={ref} >    
                <button ref={btnRef} className="remove" onClick={() => removeSticker()} style={{display: state ? "block" : "none",fontSize: "20px"}}>✕</button>
                <img onClick={(e) => onclick()} src={src} alt="sticker" />
            </div>

            <Moveable
                target={ref}
                draggable={state}
                scalable={state}
                rotatable={state}
                keepRatio={false}
                onDragStart={helper.onDragStart}
                onDrag={onDrag}
                onScaleStart={helper.onScaleStart}
                onScale={onResize}
                onRotateStart={helper.onRotateStart}
                onRotate={helper.onRotate}
                hideDefaultLines={!state}
                bounds={bounds}
            />
        </div>
    )
}