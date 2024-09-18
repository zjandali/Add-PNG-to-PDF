import React, { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import { PDFDocument } from 'pdf-lib';
import 'react-resizable/css/styles.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const App = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [image, setImage] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 100, height: 100 });
  const [pdfDimensions, setPdfDimensions] = useState({ width: 0, height: 0 });
  const [numPages, setNumPages] = useState(null);
  const imageUrlRef = useRef(null);

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'image/png') {
      setImage(file);
      if (imageUrlRef.current) {
        URL.revokeObjectURL(imageUrlRef.current);
      }
      imageUrlRef.current = URL.createObjectURL(file);
    } else {
      alert('Please upload a valid PNG image.');
    }
  };

  const handleDrag = (e, ui) => {
    setPosition({ x: ui.x, y: ui.y });
  };

  const handleResize = (event, { size }) => {
    setSize({ width: size.width, height: size.height });
  };

  const handleDownload = async () => {
    if (!pdfFile || !image) {
      alert('Please upload both a PDF and a PNG image.');
      return;
    }

    try {
      console.log('Starting PDF modification process...');

      // Load the original PDF using pdf-lib
      const pdfArrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfArrayBuffer);
      console.log('Original PDF loaded with pdf-lib');

      // Get the first page
      const [firstPage] = pdfDoc.getPages();
      const { width: pdfWidth, height: pdfHeight } = firstPage.getSize();

      // Load the PNG image
      const imageArrayBuffer = await image.arrayBuffer();
      const pngImage = await pdfDoc.embedPng(imageArrayBuffer);
      console.log('PNG image embedded');

      // Calculate image position and size
      const imgX = (position.x / pdfDimensions.width) * pdfWidth;
      const imgY = pdfHeight - ((position.y / pdfDimensions.height) * pdfHeight) - ((size.height / pdfDimensions.height) * pdfHeight);
      const imgWidth = (size.width / pdfDimensions.width) * pdfWidth;
      const imgHeight = (size.height / pdfDimensions.height) * pdfHeight;

      console.log(`Drawing image at (${imgX}, ${imgY}) with size ${imgWidth} x ${imgHeight}`);

      // Draw the image on the PDF
      firstPage.drawImage(pngImage, {
        x: imgX,
        y: imgY,
        width: imgWidth,
        height: imgHeight,
      });

      console.log('Image drawn on PDF');

      // Save the PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'modified_document.pdf';
      link.click();

      console.log('PDF saved and download initiated');

    } catch (error) {
      console.error('Error modifying PDF:', error);
      alert('An error occurred while modifying the PDF. Check the console for details.');
    }
  };

  const onPageLoadSuccess = (page) => {
    setPdfDimensions({
      width: page.width,
      height: page.height,
    });
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">PDF Image Overlay App</h1>
      <div className="mb-4">
        <input
          type="file"
          accept=".pdf"
          onChange={handlePdfUpload}
          className="mb-2"
        />
        <input
          type="file"
          accept=".png"
          onChange={handleImageUpload}
          className="mb-2"
        />
      </div>
      {pdfFile && (
        <div className="relative">
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            loading="Loading PDF..."
          >
            <Page
              pageNumber={1}
              onLoadSuccess={onPageLoadSuccess}
              width={600}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </Document>
          {image && pdfDimensions.width > 0 && pdfDimensions.height > 0 && (
            <Draggable
              bounds="parent"
              position={position}
              onDrag={handleDrag}
            >
              <ResizableBox
                width={size.width}
                height={size.height}
                onResize={handleResize}
                minConstraints={[50, 50]}
                maxConstraints={[300, 300]}
                className="absolute"
              >
                <img
                  src={imageUrlRef.current}
                  alt="Overlay"
                  className="w-full h-full"
                />
              </ResizableBox>
            </Draggable>
          )}
        </div>
      )}
      {pdfFile && (
        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Download Modified PDF
        </button>
      )}
    </div>
  );
};

export default App;