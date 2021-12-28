import React from 'react';
import '../../../assets/css/showBlog.css';
import BlogMenu from './BlogMenu';
import BoardPage from '../../../pages/BoardPage';
import ArchivePage from '../../../pages/ArchivePage';
import { Route } from 'react-router-dom';

const BlogDetail = ({ blog, blogOwnerCheck, goMain, blogDesign }) => {
  return (
    <div className={blogDesign.section}>
      <img className='showBlogTitleImg' src={blog.logo_image}
           onClick={goMain} alt='logo' />
      <div className={blogDesign.menu}>
        <BlogMenu blog={blog} blogOwnerCheck={blogOwnerCheck} goMain={goMain} />
      </div>
      <Route path={'/yamoonjin.com/blog/' + blog.name} exact={true}>
        {
          blog.main_content === 0 &&
          <h4>BoardList</h4>
        }
        {
          blog.main_content === 1 &&
          <h4>Business Card</h4>
        }
        {
          blog.main_content === 2 &&
          <h4>Profile</h4>
        }
      </Route>
      <Route path={'/yamoonjin.com/blog/' + blog.name + '/board'}><BoardPage /></Route>
      <Route path={'/yamoonjin.com/blog/' + blog.name + '/archive'}><ArchivePage /></Route>
    </div>
  );
};

export default BlogDetail;