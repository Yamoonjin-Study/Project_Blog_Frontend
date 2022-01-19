import React from 'react';
import PdfViewer from './PdfViewer';

const ArchiveList = (archives) => {

  const archive = archives.archives;
  const file_path = archive.file_path;

  return (
    <div className='boardList'>
      <div className='boardContent' style={{textAlign:'center'}}>
        <h5>{archive.title}</h5>
        <div className='divider'></div>
        {
          file_path !== null
            ? <PdfViewer url={file_path} />
            : null
        }
        {<h4
          dangerouslySetInnerHTML={{ __html: archive.content }}></h4>}
      </div>
    </div>
  );
};

export default ArchiveList;