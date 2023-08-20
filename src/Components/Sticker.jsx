import { useRef, useState } from "react";

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

export const Sticker = ({state, zIndex, src, onclick, removeSticker}) => {
    const [helper] = useState(() => {
        return new MoveableHelper();
    });
    const ref = useRef(null);
    return (
        <div className="container" style={{zIndex: zIndex, position:"relative"}} >
            <div className="target" ref={ref} >
                <button className="remove" onClick={()=>removeSticker()} style={{display : state ? "block" : "none"}}>X</button>
                <img onClick={(e) => onclick()} src="https://picsum.photos/320/240" alt="sticker" width="320" height="240" />
            </div>

            <Moveable
                target={ref}
                draggable={state}
                scalable={state}
                rotatable={state}
                keepRatio={state}
                onDragStart={helper.onDragStart}
                onDrag={helper.onDrag}
                onScaleStart={helper.onScaleStart}
                onScale={helper.onScale}
                onRotateStart={helper.onRotateStart}
                onRotate={helper.onRotate}
                hideDefaultLines={!state}
            />
        </div>
    )
}