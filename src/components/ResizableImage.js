// src/components/ResizableImage.js
import React from 'react';
import { Rnd } from 'react-rnd';
import './ResizableImage.css'; // Ensure this file exists

const ResizableImage = ({ src, onResize }) => {
  return (
    <Rnd
      className="overlay-image"
      size={{ width: 200, height: 200 }}
      position={{ x: 100, y: 100 }}
      onDragStop={(e, d) => {
        onResize({ x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        onResize({
          width: parseInt(ref.style.width, 10),
          height: parseInt(ref.style.height, 10),
          ...position,
        });
      }}
      bounds="parent" // Restrict movement within the parent container
      style={{ zIndex: 10 }}
    >
      <img
        src={src}
        alt="Uploaded"
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </Rnd>
  );
};

export default ResizableImage;
