import React, { useEffect, useRef, useState } from "react";
import { Canvas, FabricImage, Circle, Rect, Textbox } from "fabric";

const CanvasEditor = ({ selectedImage }) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [imageObject, setImageObject] = useState(null);

  useEffect(() => {
    const fabricCanvas = new Canvas(canvasRef.current, {
      height: 500,
      width: 500,
    });
    setCanvas(fabricCanvas);

    return () => fabricCanvas.dispose();
  }, []);

  useEffect(() => {
    if (canvas && selectedImage) {
      const imgElement = new window.Image();
      imgElement.crossOrigin = "anonymous";
      imgElement.src = selectedImage;

      imgElement.onload = () => {
        const imgInstance = new FabricImage(imgElement, {
          scaleX: canvas.width / imgElement.width,
          scaleY: canvas.height / imgElement.height,
          selectable: false,
        });
        canvas.clear();
        canvas.add(imgInstance);
        canvas.setActiveObject(imgInstance);
        setImageObject(imgInstance);
        canvas.renderAll();
      };

      imgElement.onerror = () => {
        alert("Error loading image due to CORS issue");
      };
    }
  }, [canvas, selectedImage]);

  const clipImageWithShape = (shape) => {
    if (!imageObject) return;
    const imgWidth = imageObject.width * imageObject.scaleX;
    const imgHeight = imageObject.height * imageObject.scaleY;

    let clipPath;
    if (shape === "circle") {
      clipPath = new Circle({
        radius: Math.min(imgWidth, imgHeight) / 2,
        left:
          imageObject.left + imgWidth / 2 - Math.min(imgWidth, imgHeight) / 2,
        top:
          imageObject.top + imgHeight / 2 - Math.min(imgWidth, imgHeight) / 2,
        originX: "center",
        originY: "center",
        selectable: false,
      });
    } else if (shape === "rectangle") {
      clipPath = new Rect({
        width: imgWidth * 0.8,
        height: imgHeight * 0.8,
        left: imageObject.left + imgWidth / 2 - (imgWidth * 0.8) / 2,
        top: imageObject.top + imgHeight / 2 - (imgHeight * 0.8) / 2,
        originX: "center",
        originY: "center",
        selectable: false,
      });
    }

    imageObject.clipPath = clipPath;
    canvas.renderAll();
  };

  const addText = () => {
    const text = new Textbox("Enter text", {
      left: 50,
      top: 50,
      width: 200,
      fontSize: 20,
      fill: "black",
      selectable: true,
      hasControls: true,
    });
    canvas.add(text);
    canvas.setActiveObject(text);
  };

  const addCaption = () => {
    const caption = new Textbox("Your Caption Here", {
      left: 50,
      top: 400,
      width: 400,
      fontSize: 18,
      fill: "white",
      fontFamily: "Arial",
      fontWeight: "bold",
      textAlign: "center",
      selectable: true,
      hasControls: true,
    });
    canvas.add(caption);
    canvas.setActiveObject(caption);
  };

  const downloadImage = () => {
    try {
      const link = document.createElement("a");
      link.download = "canvas.png";
      link.href = canvas.toDataURL({ format: "png" });
      link.click();
    } catch (error) {
      alert("Error downloading the image: CORS issue");
    }
  };

  return (
    <div className="p-4">
      <div className="flex space-x-4 mb-4">
        <button className="bg-blue-500 text-white px-4 py-2" onClick={addText}>
          Add Text
        </button>
        <button
          className="bg-purple-500 text-white px-4 py-2"
          onClick={addCaption}
        >
          Add Caption
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2"
          onClick={() => clipImageWithShape("circle")}
        >
          Clip with Circle
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2"
          onClick={() => clipImageWithShape("rectangle")}
        >
          Clip with Rectangle
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2"
          onClick={downloadImage}
        >
          Download
        </button>
      </div>
      <canvas ref={canvasRef} className="border"></canvas>
    </div>
  );
};

export default CanvasEditor;
