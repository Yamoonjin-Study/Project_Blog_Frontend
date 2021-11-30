import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BlogSetting = ({match}) => {

  const blogname = match.params.name;
  const [blogOwnerCheck, setBlogOwnerCheck] = useState('');
  const [blog, setBlog] = useState({
    id: '',
    name: '',
    info: '',
    icon: '',
    create_date: '',
    status: '',
    logo_image: '',
    main_content: '',
    menu_design: '',
    category: '',
  });

  //블로그의 주인인지 아닌지를 체크해줘야한다.
  useEffect(() => {
    fetch('http://localhost:8080/blog/myBlog', {
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res => res.json())
    .then(res => {
      if (res.blogname === blogname) {
        setBlogOwnerCheck('true');
      } else {
        setBlogOwnerCheck('false');
      }
    });
  }, []);

  //블로그 호출
  useEffect(() => {
    fetch('http://localhost:8080/blog/' + blogname, {
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res => res.json())
    .then(res => {
      if (res.responseMessage === 'No Result') {
        alert('블로그를 조회할 수 없습니다. 관리자에게 문의해 주세요.');
      } else {
        setBlog(res.blog);
      }
    });
  }, []);
  return (
    <div className={
      blog.menu_design === 0
        ? 'showBlogLeftSection'
        : 'showBlogRightSection'
    }>
      <img className='showBlogTitleImg' src={blog.logo_image} />
      {
        blog.menu_design === 0
          ? <div className='showBlogLeftMenu'>
            <h2><img className='iconImage' src={blog.icon} />{blog.name}</h2>
            <h6>_{blog.category} 계정</h6>
            <h6>DesignForm_{blog.design_form}</h6>
            <button>Following</button>
            <button>Follower</button>
            <br />
            {
              blogOwnerCheck === 'true'
                ? <Link to='/yamoonjin.com/blogSettings'>
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
          : (blog.menu_design === 2
              ? <div className='showBlogRightMenu'>
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