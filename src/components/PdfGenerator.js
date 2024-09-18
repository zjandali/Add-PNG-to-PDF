// src/components/PdfGenerator.js
import React from 'react';
import jsPDF from 'jspdf';

const PdfGenerator = ({ imageSrc, imageDimensions }) => {
  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    });

    const { width, height, x, y } = imageDimensions;

    // Adjust positions and sizes as needed
    doc.addImage(imageSrc, 'PNG', x, y, width, height);
    doc.save('download.pdf');
  };

  return (
    <button onClick={generatePDF} style={{ padding: '10px 20px', fontSize: '16px' }}>
      Save as PDF
    </button>
  );
};

export default PdfGenerator;
