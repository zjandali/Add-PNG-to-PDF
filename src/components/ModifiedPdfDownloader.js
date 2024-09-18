// src/components/ModifiedPdfDownloader.js
import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const ModifiedPdfDownloader = ({ pdfData, imageSrc, imageDimensions }) => {
  const [loading, setLoading] = useState(false);

  const downloadModifiedPdf = async () => {
    setLoading(true);
    try {
      // Load the existing PDF
      const pdfDoc = await PDFDocument.load(pdfData);

      // Embed the PNG image
      const pngImage = await pdfDoc.embedPng(imageSrc);
      const pngDims = pngImage.scale(1);

      // Get the first page of the PDF
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      // Calculate the position and size
      const { width, height, x, y } = imageDimensions;

      // Add the image to the PDF page
      firstPage.drawImage(pngImage, {
        x: x,
        y: firstPage.getHeight() - y - height, // Adjust y-coordinate
        width: width,
        height: height,
      });

      // Serialize the PDFDocument to bytes (a Uint8Array)
      const pdfBytesModified = await pdfDoc.save();

      // Trigger the download
      const blob = new Blob([pdfBytesModified], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'modified.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error modifying PDF:', error);
      alert('An error occurred while modifying the PDF.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={downloadModifiedPdf}
      style={{ padding: '10px 20px', fontSize: '16px' }}
      disabled={loading}
    >
      {loading ? 'Processing...' : 'Save Modified PDF'}
    </button>
  );
};

export default ModifiedPdfDownloader;
