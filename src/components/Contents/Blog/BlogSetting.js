import React from 'react';
import BlogMenu from './BlogMenu';

const BlogSetting = ({blog, blogOwnerCheck, goMain}) => {

  return (
    <div className={
      blog.menu_design === 0
        ? 'showBlogLeftSection'
        : 'showBlogRightSection'
    }>
      <img className='showBlogTitleImg' src={blog.logo_image} onClick={goMain} alt='logo'/>
      {
        blog.menu_design === 0
          ? <div className='showBlogLeftMenu'>
            <BlogMenu blog={blog} blogOwnerCheck={blogOwnerCheck} goMain={goMain}/>
          </div>
          : (blog.menu_design === 2
              ? <div className='showBlogRightMenu'>
                <BlogMenu blog={blog} blogOwnerCheck={blogOwnerCheck} goMain={goMain}/>
              </div>
              : null
          )
      }
      <div className='showBlogContent'>
        <h3>블로그 설정</h3>
      </div>
    </div>
  );
};

export default BlogSetting;