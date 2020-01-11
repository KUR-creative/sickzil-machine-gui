import React, { useState, useCallback, useEffect, useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import sizeOf from "image-size";

function Drawer({canvas, imgfilename, path}) {
    let currentsize = [];
    console.log(imgfilename, path);
    currentsize[0] = sizeOf(`${path}/${imgfilename[0]}`);
    console.log(currentsize[0]);
    return (
        <div>
          <CanvasDraw
            ref={canvas}
            canvasWidth={currentsize[0].width}
            canvasHeight={currentsize[0].height}
            imgSrc={`${path}/${imgfilename[0]}`}
          />
        </div>
    )
}

export default Drawer;