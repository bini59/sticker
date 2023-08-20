import { useRef, useState, useEffect } from "react";

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

        console.log(nowLeft)
        console.log(left-100+(width-target.offsetWidth)/2)
        console.log(right-width)


        
        if(nowLeft < left) {
            e.translate[0] = left - 100 + (width - target.offsetWidth) / 2;
        }
        if(nowTop < top) {
            e.translate[1] = top-150+(height-target.offsetHeight)/2;
        }
        if (nowRight > right) {
            e.translate[0] =right - target.offsetWidth - 100 - (width - target.offsetWidth)/2;
        }

        if (nowBottom > bottom) {
            e.translate[1] = bottom - target.offsetHeight - 150 - (height - target.offsetHeight)/2;
        }

        helper.onDrag(e);



    }

    return (
        <div className="container" style={{ zIndex: zIndex, position: "relative"}} >
            <div className="target" ref={ref} >
                <button className="remove" onClick={()=>removeSticker()} style={{display : state ? "block" : "none", fontSize: "20px"}}>✕</button>
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
                onScale={helper.onScale}
                onRotateStart={helper.onRotateStart}
                onRotate={helper.onRotate}
                hideDefaultLines={!state}
                bounds={bounds}
            />
        </div>
    )
}