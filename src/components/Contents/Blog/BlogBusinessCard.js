import React from 'react';
import PdfViewer from '../Archive/PdfViewer';

const BlogBusinessCard = (blog) => {
  const blog_info = blog.blog;
  const blog_business_card = blog_info.business_card;
  const file_path = blog_business_card.file_path;
  return (
    <div className='showBlogContent'>
      <h4 className='mainTitle'>Business Card</h4>
      <div className='divider' id='divider'></div>
      {
        file_path !== null
          ? <PdfViewer url={file_path} />
          : null
      }
      <br/>
      <br/>
      <br/>
      <br/>
      {<h4
        dangerouslySetInnerHTML={{ __html: blog_business_card.content }}></h4>}
    </div>
  );
};

export default BlogBusinessCard;