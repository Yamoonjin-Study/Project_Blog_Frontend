import React from 'react';
import PdfViewer from '../Archive/PdfViewer';

const BlogBusinessCard = (blog) => {
  const blogInfo = blog.blog;
  const blogBusinessCard = blogInfo.businessCard;
  const filePath = blogBusinessCard.filePath;
  return (
    <div>
      <div id='divider' className='divider'></div>
      {
        filePath !== null
          ? <PdfViewer url={filePath} />
          : null
      }
      <br/>
      <br/>
      <br/>
      <br/>
      {<h4
        dangerouslySetInnerHTML={{ __html: blogBusinessCard.content }}></h4>}
    </div>
  );
};

export default BlogBusinessCard;