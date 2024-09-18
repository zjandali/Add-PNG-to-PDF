# PDF Image Overlay App

This React-based web application allows users to upload a PDF file and a PNG image, then overlay the image onto the first page of the PDF. Users can drag, resize, and position the image on a preview before generating a modified PDF with the embedded image.

## Detailed Description

The PDF Image Overlay App provides a user-friendly interface for adding image watermarks or overlays to PDF documents. It's particularly useful for adding logos, signatures, or other visual elements to existing PDFs without the need for complex PDF editing software.

### Key Functionality:

1. **PDF Upload**: Users can upload any PDF document. The app uses the `react-pdf` library to render a preview of the first page of the PDF.

2. **Image Upload**: Users can upload a PNG image that will serve as the overlay. The app creates a URL for this image and displays it on top of the PDF preview.

3. **Interactive Positioning**: Leveraging `react-draggable`, the app allows users to click and drag the uploaded image to any position on the PDF preview.

4. **Resizing Capability**: Using `react-resizable`, users can adjust the size of the overlay image by dragging its corners.

5. **PDF Modification**: When the user is satisfied with the position and size of the image overlay, they can generate a modified PDF. The app uses the `pdf-lib` library to embed the PNG image into the actual PDF document at the specified position and size.

6. **Download**: The modified PDF is then made available for download, with the image overlay now an integral part of the PDF.

### Technology Stack:

- **React**: The app is built using React, providing a responsive and interactive user interface.

- **react-pdf**: This library is used to render the PDF preview in the browser, allowing users to see the first page of their uploaded PDF.

- **react-draggable**: This React component enables the drag functionality for positioning the image overlay.

- **react-resizable**: Another React component that provides the resizing handles for adjusting the image size.

- **pdf-lib**: A powerful PDF manipulation library that's used on the client-side to modify the PDF by embedding the image at the correct position and size.

- **File API**: The app uses the browser's File API to handle file uploads and to create object URLs for previewing the uploaded image.

### How it Works:

1. When a PDF is uploaded, `react-pdf` creates a preview of its first page.

2. The uploaded PNG image is displayed on top of this preview using absolute positioning.

3. As the user drags or resizes the image, the app updates the position and size states.

4. When the user clicks to download, the app uses `pdf-lib` to:
   - Load the original PDF
   - Embed the PNG image
   - Draw the image on the first page of the PDF at the specified position and size
   - Generate a new PDF with these modifications

5. The modified PDF is then offered as a download to the user.

This app demonstrates the power of client-side JavaScript in performing operations that traditionally required server-side processing or desktop software. It leverages modern web technologies to provide a seamless, in-browser experience for PDF modification.

## Features

- Upload PDF files and PNG images
- Interactive preview of the PDF's first page
- Drag and resize functionality for positioning the image overlay
- Generate and download a modified PDF with the image embedded

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/pdf-image-overlay-app.git
   cd pdf-image-overlay-app
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Click the first "Choose File" button to upload a PDF file.
2. Click the second "Choose File" button to upload a PNG image.
3. Once both files are uploaded, you'll see a preview of the PDF's first page.
4. Drag the image to position it on the PDF preview.
5. Resize the image by dragging its corners.
6. When satisfied with the image placement, click the "Download Modified PDF" button.
7. The browser will download the modified PDF with the image embedded.

## Dependencies

- React
- react-pdf
- react-draggable
- react-resizable
- pdf-lib

## Limitations

- Currently supports single-page PDFs only
- Only accepts PNG images for overlay
- Large PDFs or images may impact performance as all processing is done client-side

## Future Enhancements

- Support for multi-page PDFs
- Additional image format support (JPEG, SVG, etc.)
- Text overlay option
- Undo/Redo functionality
- Save projects for later editing
