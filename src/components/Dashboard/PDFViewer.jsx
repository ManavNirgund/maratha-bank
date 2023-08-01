import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

const PDFViewer = ({ pdfData }) => {
  return (
    <div>
      <Document file={`data:application/pdf;base64,${pdfData}`}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default PDFViewer;
