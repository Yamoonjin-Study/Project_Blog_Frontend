import React from 'react';
import '../../../assets/css/showBlog.css';
import BlogMenu from './BlogMenu';
import BoardPage from '../../../pages/BoardPage';

const BlogDetail = ({ blog, blogOwnerCheck, goMain, blogDesign }) => {

  return (
    <div className={blogDesign.section}>
      <img className='showBlogTitleImg' src={blog.logo_image}
           onClick={goMain} alt='logo'/>
      <div className={blogDesign.menu}>
        <BlogMenu blog={blog} blogOwnerCheck={blogOwnerCheck} goMain={goMain}/>
      </div>
      {
        window.location.pathname.indexOf('/yamoonjin.com/blog/'+blog.name+'/board') === 0
        ?<BoardPage />
        :(
            blog.main_content === 0
              ? <div className='showBlogContent'><h4>게시글 리스트</h4></div>
              : (blog.main_content === 1
                  ? <div className='showBlogContent'><h2>Business Card</h2></div>
                  : (blog.main_content === 2
                      ? <div className='showBlogContent'><h2>Profile</h2></div>
                      : <div className='showBlogContent'><h2>Board</h2></div>
                  )
              )
          )
        }
    </div>
  );
};

export default BlogDetail;