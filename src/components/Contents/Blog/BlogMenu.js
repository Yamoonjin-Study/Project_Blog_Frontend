import React from 'react';
import { Link } from 'react-router-dom';

const BlogMenu = ({blog, blogOwnerCheck, goMain}) => {
  return (
    <div>
      <h2><img className='iconImage' src={blog.iconImage} onClick={goMain} alt='icon'/>{blog.blogName}</h2>
      <h6>_{blog.category} 계정</h6>
      <h6>DesignForm_</h6>
      <button>Following</button>
      <button>Follower</button>
      <br />
      {
        blogOwnerCheck === 'true'
          ? <Link to={'/yamoonjin.com/blog/' + blog.blogName + '/settings'}>
            <button>Settings</button>
          </Link>
          : null
      }
      <hr style={{ width: '80%', margin: '15px 10% 15px 10%' }} />
      <div className='showBlogContentsMenu'>
        <Link to ={'/yamoonjin.com/blog/' + blog.blogName + '/board/list'}><h6>> board list</h6></Link>
        {
          blogOwnerCheck === 'true' &&
          <Link to ={'/yamoonjin.com/blog/' + blog.blogName + '/board/write'}><h6>> write board</h6></Link>
        }
        <Link to ={'/yamoonjin.com/blog/' + blog.blogName + '/archive/list'}><h6>> archive list</h6></Link>
        {
          blogOwnerCheck === 'true' &&
          <Link to ={'/yamoonjin.com/blog/' + blog.blogName + '/archive/upload'}><h6>> upload archive</h6></Link>
        }
        <Link to ={'/yamoonjin.com/blog/' + blog.blogName + '/guestbook'}><h6>> guest books</h6></Link>
      </div>
    </div>
  );
};

export default BlogMenu;