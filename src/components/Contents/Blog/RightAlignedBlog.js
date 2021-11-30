import React from 'react';
import '../../../assets/css/showBlog.css';
import { Link } from 'react-router-dom';

const RightAlignedBlog = (props) => {

  const blog = props.blog;
  const blogOwnerCheck = props.blogOwnerCheck;

  return (
    <div className='showBlogRightSection'>
      <img className='showBlogTitleImg' src={blog.logo_image} />
          <div className='showBlogRightMenu'>
                <h2><img className='iconImage' src={blog.icon} />{blog.name}</h2>
                <h6>_{blog.category} 계정</h6>
                <h6>DesignForm_{blog.design_form}</h6>
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
                  <h6>> boards</h6>
                  <h6>> guest books</h6>
                </div>
              </div>
      <div className='showBlogContent'>
        {blog.main_content === 0
          ? <h2>Null</h2>
          : (blog.main_content === 1
              ? <h2>Business Card</h2>
              : (blog.main_content === 2
                  ? <h2>Profile</h2>
                  : <h2>Board</h2>
              )
          )
        }
      </div>
      <div className='showBlogContent'>
        <h4>게시글 리스트</h4>
      </div>
    </div>
  );
};

export default RightAlignedBlog;