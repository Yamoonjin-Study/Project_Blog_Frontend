import React from 'react';
import PdfViewer from './PdfViewer';

const ArchiveList = (archives) => {

  const archive = archives.archives;
  const filePath = archive.filePath;

  return (
    <div className='boardList'>
      <div className='boardContent' style={{textAlign:'center'}}>
        <h5>{archive.title}</h5>
        <div className='divider'></div>
        {
          filePath !== null
            ? <PdfViewer url={filePath} />
            : null
        }
        {<h4
          dangerouslySetInnerHTML={{ __html: archive.content }}></h4>}
      </div>
    </div>
  );
};

export default ArchiveList;