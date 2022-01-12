import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';

const PdfViewer = (url) => {

  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    setPdfUrl(url);
  }, [url]);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const backPage = (e) => {
    e.preventDefault();
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      document.getElementById('divider').scrollIntoView(true);
    } else {
      alert('첫 페이지 입니다.');
    }
  };

  const goPage = (e) => {
    e.preventDefault();
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
      document.getElementById('divider').scrollIntoView(true);
    } else {
      alert('마지막 페이지 입니다.');
    }
  };

  const selectPage = (e) => {
    e.preventDefault();
    if (e.target.value > numPages || e.target.value < 1) {
      alert('전체 페이지 범위를 확인해주세요.');
    } else {
      setPageNumber(parseInt(e.target.value));
      document.getElementById('divider').scrollIntoView(true);
    }
  };

  return (
    <div className='pdfPreviewer' style={
      pdfUrl.url !== 'none'
        ? { minHeight: '600px' }
        : { height: 'auto' }
    }>
      {
        pdfUrl.url === 'none'
          ? <span>No PDF file specified.</span>
          : <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
      }
      {
        pdfUrl.url !== 'none'
        && <div id='pdfPreviewerNavi' className='pdfPreviewerNavi'>
          <button className='btn2 btnHover'
                  onClick={backPage}>
            &lt;
          </button>
          <span>Page <input type='text' value={pageNumber}
                            onChange={selectPage} style={{
            width: '25px',
            fontWeight: 'normal',
            textAlign: 'center',
          }} /> of {numPages}</span>
          <button className='btn2 btnHover'
                  onClick={goPage}>
            &gt;
          </button>
        </div>
      }
    </div>
  );
};

export default PdfViewer;