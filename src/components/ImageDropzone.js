// src/components/ImageDropzone.js
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageDropzone = ({ onImageUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles[0]) {
        const file = acceptedFiles[0];
        console.log("Dropped Image file:", file); // Debugging
        const reader = new FileReader();
        reader.onload = () => {
          onImageUpload(reader.result);
        };
        reader.onerror = (error) => {
          console.error("Error reading image file:", error);
          alert("Failed to read the image file.");
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/png',
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: '2px dashed #cccccc',
        borderRadius: '10px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        marginBottom: '20px',
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the PNG image here...</p>
      ) : (
        <p>Drag and drop a PNG image here, or click to select one</p>
      )}
    </div>
  );
};

export default ImageDropzone;
