import React from 'react';
import BlogMenu from './BlogMenu';

const BlogSetting = ({blog, blogOwnerCheck, goMain, blogDesign}) => {

  return (
    <div className={blogDesign.section}>
      <img className='showBlogTitleImg' src={blog.logo_image}
           onClick={goMain} alt='logo'/>
      <div className={blogDesign.menu}>
        <BlogMenu blog={blog} blogOwnerCheck={blogOwnerCheck} goMain={goMain}/>
      </div>
      <div className='showBlogContent'>
        <h3>블로그 설정</h3>
      </div>
    </div>
  );
};

export default BlogSetting;