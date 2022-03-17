import React from 'react';
import '../../../assets/css/showBlog.css';
import BlogMenu from './BlogMenu';
import BoardPage from '../../../pages/BoardPage';
import ArchivePage from '../../../pages/ArchivePage';
import { Route } from 'react-router-dom';
import BlogBoardList from './BlogBoardList';
import BlogArchiveList from './BlogArchiveList';
import BlogBusinessCard from './BlogBusinessCard';
import GuestBooks from '../GuestBook/GuestBooks';

const BlogDetail = ({ blog, blogOwnerCheck, goMain, blogDesign }) => {

  return (
    <div className={blogDesign.section}>
      <img className='showBlogTitleImg' src={blog.logoImage}
           onClick={goMain} alt='logo' />
      <div className={blogDesign.menu}>
        <BlogMenu blog={blog} blogOwnerCheck={blogOwnerCheck} goMain={goMain} />
      </div>
      <Route path={'/yamoonjin.com/blog/' + blog.blogName} exact={true}>
        {
          blog.mainContent === 0 &&
          <BlogBoardList />
        }
        {
          blog.mainContent === 1 &&
          (
            blog.businessCard !== null
              ? <BlogBusinessCard blog={blog} />
              : <h3>명함을 등록해주세요. <i>Business Card is null.</i></h3>
          )
        }
        {
          blog.mainContent === 2 &&
          <BlogArchiveList blog={blog} />
        }
      </Route>
      <Route path={'/yamoonjin.com/blog/' + blog.blogName
      + '/board'}><BoardPage /></Route>
      <Route path={'/yamoonjin.com/blog/' + blog.blogName
      + '/archive'}><ArchivePage /></Route>
      <Route path={'/yamoonjin.com/blog/' + blog.blogName + '/guestbook'}
             exact={true}>
        <GuestBooks blogOwnerCheck={blogOwnerCheck} />
      </Route>
    </div>
  );
};

export default BlogDetail;