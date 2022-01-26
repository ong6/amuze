import React, { useEffect, useRef } from "react";
import { drawText } from "../pages/api/canvas";
import { changeratio } from "../pages/api/util.js";
import img from "../public/souvenir_template.png";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const imgData = props.imgdata;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = changeratio(2510);
    canvas.height = changeratio(1930);

    let imgObj = new Image();
    let imageSrc = img.src;

    function addImageProcess(src) {
      return new Promise(() => {
        imgObj.crossOrigin = "anonymous";
        imgObj.onload = () => {
          let w = canvas.width;
          let nw = imgObj.naturalWidth;
          let nh = imgObj.naturalHeight;
          let aspect = nw / nh;
          let h = w / aspect;
          canvas.height = h;
          context.drawImage(imgObj, 0, 0, w, h);

          drawText(context);
          // document.getElementById('msg').addEventListener('input', drawText(context));
        };
        imgObj.src = src;
      });
    }

    addImageProcess(imageSrc);
  }, [imgData]);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
