// src/components/PdfDropzone.js
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const PdfDropzone = ({ onPdfUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles[0]) {
        const file = acceptedFiles[0];
        console.log("Dropped PDF file:", file); // Debugging
        onPdfUpload(file);
      }
    },
    [onPdfUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'application/pdf',
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
        <p>Drop the PDF file here...</p>
      ) : (
        <p>Drag and drop a PDF file here, or click to select one</p>
      )}
    </div>
  );
};

export default PdfDropzone;
