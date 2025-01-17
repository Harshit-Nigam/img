import React, { useEffect, useRef, useState } from 'react';
import { Canvas, Image, Circle, Rect, Textbox } from 'fabric';  // Correct import

const CanvasEditor = ({ selectedImage }) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

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
      Image.fromURL(selectedImage, (img) => {
        img.scaleToWidth(canvas.width);
        canvas.add(img);
        canvas.setActiveObject(img);
      });
    }
  }, [canvas, selectedImage]);

  const addText = () => {
    const text = new Textbox('Enter text', {
      left: 50,
      top: 50,
      width: 200,
      fontSize: 20,
    });
    canvas.add(text);
  };

  const addShape = (shape) => {
    let shapeObject;
    if (shape === 'circle') {
      shapeObject = new Circle({ radius: 50, fill: 'blue', left: 100, top: 100 });
    } else if (shape === 'rectangle') {
      shapeObject = new Rect({ width: 100, height: 60, fill: 'green', left: 100, top: 100 });
    }
    canvas.add(shapeObject);
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.download = 'canvas.png';
    link.href = canvas.toDataURL({ format: 'png' });
    link.click();
  };

  return (
    <div className="p-4">
      <div className="flex space-x-4 mb-4">
        <button className="bg-blue-500 text-white px-4 py-2" onClick={addText}>
          Add Text
        </button>
        <button className="bg-green-500 text-white px-4 py-2" onClick={() => addShape('circle')}>
          Add Circle
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2" onClick={() => addShape('rectangle')}>
          Add Rectangle
        </button>
        <button className="bg-red-500 text-white px-4 py-2" onClick={downloadImage}>
          Download
        </button>
      </div>
      <canvas ref={canvasRef} className="border"></canvas>
    </div>
  );
};

export default CanvasEditor;
