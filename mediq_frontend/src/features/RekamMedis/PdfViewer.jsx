import React from 'react';
import { Document, Page } from 'react-pdf';

import DummyPdf from '../Assets/dummy.pdf';
import '@react-pdf-viewer/core/lib/styles/index.css';

import { Worker, Viewer } from '@react-pdf-viewer/core';
const MyPdfViewer = () => {
    const dummyUrl = '../Assets/dummy.pdf'
  return (
    <div>
        
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer fileUrl='../Assets/dummy.pdf'/>
      </Worker>
    </div>
  );
};

export default MyPdfViewer;
