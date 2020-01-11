import React, { useState, useCallback, useEffect, useRef } from "react";
import CanvasDraw from "react-canvas-draw";

function Drawer({canvas, imgfilename, path}) {
    console.log(imgfilename, path);
    return (
        <div>
          <CanvasDraw
            ref={canvas}
            canvasWidth={300}
            canvasHeight={300}
            imgSrc={`${path}/${imgfilename[0]}`}
          />
        </div>
    )
}

export default Drawer;