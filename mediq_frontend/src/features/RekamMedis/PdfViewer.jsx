import React, { useState, useEffect } from 'react';
import { Worker, Viewer} from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { toolbarPlugin, ToolbarSlot } from '@react-pdf-viewer/toolbar';
import DummyPdf from '../Assets/recam-medik.pdf';
import Cetak from '../Assets/print.svg'
import pdfjs from 'pdfjs-dist';

const MyPdfViewer = () => {
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [pageHeight, setPageHeight] = useState(null);


  const loadPdf = async () => {
    try {
      const response = await fetch(DummyPdf);
      if (!response.ok) {
        throw new Error('Failed to fetch PDF');
      }
      setPdfLoaded(false);

      setPdfLoaded(true);
    } catch (error) {
      setLoadError(error);
    }
  };

  useEffect(() => {
    loadPdf();
  }, []);

  const handleDownload = () => {
    fetch(DummyPdf)
    .then((response) => response.blob())
    .then((blob) => {
      // Create a Blob object and URL for the data
      const blobUrl = URL.createObjectURL(blob);

      // Create a download link
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'RekamMedis.pdf'; // Set the desired filename
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Remove the link element from the DOM
      document.body.removeChild(link);
    })
    .catch((error) => {
      console.error('Error downloading PDF:', error);
    });
  }

  const handleReloadPDF = () => {
    setPdfLoaded(false);
    setLoadError(null);
    loadPdf();
  }

  return (
    <div className='font-poppins w-full h-screen'>
      <div className='justify-end w-full flex '>
        <button className='rounded-xl h-auto text-[#F21F61] w-auto px-4 mt-5 border-[#F21F61] bg-white flex flex-row border-2 gap-x-2 justify-center' onClick={handleDownload}>
            <img src={Cetak} alt="" className='h-7'/>
            <h1 className='text-lg'>Cetak</h1>
        </button>
      </div>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div className='mt-4 h-full bg-white rounded-2xl shadow-2xl w-full border-gray-200 border-2 overflow-hidden'>
          {pdfLoaded ? (
            <div className="rpv-core__viewer"
            style={{
              border: '1px solid rgba(0, 0, 0, 0.3)',
              display: 'flex',
              height: '100%',
              position: 'relative',
            }}>
              
                <div
                  style={{
                    alignItems: 'center',
                    backgroundColor: '#eeeeee',
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    borderRadius: '2px',
                    top: '16px',
                    display: 'flex',
                    left: '50%',
                    padding: '4px',
                    position: 'absolute',
                    transform: 'translate(-50%, 0)',
                    zIndex: 1,
                  }}
                >
                  <Toolbar>
                    {(props) => {
                      const {
                        CurrentPageInput,
                        EnterFullScreen,
                        GoToNextPage,
                        GoToPreviousPage,
                        NumberOfPages,
                        ZoomIn,
                        ZoomOut,
                      } = props;
                      return (
                        <>
                          <div style={{ padding: '0px 2px' }}>
                            <ZoomOut />
                          </div>
                          <div style={{ padding: '0px 2px' }}>
                            <ZoomIn />
                          </div>
                          <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                            <GoToPreviousPage />
                          </div>
                          <div style={{ padding: '0px 2px', width: '4rem' }}>
                            <CurrentPageInput />
                          </div>
                          <div className='p-2 flex '>
                            <p className='mr-2'>/</p>
                            <NumberOfPages />
                          </div>
                          <div style={{ padding: '0px 2px' }}>
                            <GoToNextPage />
                          </div>
                          <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                            <EnterFullScreen />
                          </div>
      
                        </>
                      );
                    }}
                  </Toolbar>
                </div>
                <div className='flex-1 overflow-hidden mt-20'>
                    <Viewer fileUrl={DummyPdf} plugins={[toolbarPluginInstance]} onDocumentLoadSuccess={() => setPdfLoaded(true)}
                  onLoadError={(error) => {
                    setLoadError(error);
                    setPdfLoaded(false);
                  }} renderError={(error) => {
                    setLoadError(error);
                    setPdfLoaded(false);
                  }}>
                    
                    </Viewer>
                </div>
            </div>
          ) : (
            <div className='flex flex-col justify-center items-center h-full text-[#F21F61] text-center'>
              <h1 className='mb-4'>PDF CANNOT BE LOADED</h1>
              <p className='text-black'>
                It seems there is an error when trying to access the PDF <br />
                ERROR: {loadError ? loadError.message : 'Unknown error'}
              </p>
              <button className='border-[#F21F61] border-2 bg-white rounded-lg mt-5 p-2' onClick={handleReloadPDF}>
                Reload PDF
              </button>
            </div>
          )}
        </div>
      </Worker>
    </div>
  );
};

export default MyPdfViewer;
