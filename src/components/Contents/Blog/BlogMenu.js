import React from 'react';
import { Link } from 'react-router-dom';

const BlogMenu = ({blog, blogOwnerCheck, goMain}) => {
  return (
    <div>
      <h2><img className='iconImage' src={blog.icon} onClick={goMain} alt='icon'/>{blog.name}</h2>
      <h6>_{blog.category} 계정</h6>
      <h6>DesignForm_</h6>
      <button>Following</button>
      <button>Follower</button>
      <br />
      {
        blogOwnerCheck === 'true'
          ? <Link to={'/yamoonjin.com/blog/' + blog.name + '/settings'}>
            <button>Settings</button>
          </Link>
          : null
      }
      <hr style={{ width: '80%', margin: '15px 10% 15px 10%' }} />
      <div className='showBlogContentsMenu'>
        <Link to ={'/yamoonjin.com/blog/' + blog.name + '/board'}><h6>> boards</h6></Link>
        <h6>> guest books</h6>
      </div>
    </div>
  );
};

export default BlogMenu;