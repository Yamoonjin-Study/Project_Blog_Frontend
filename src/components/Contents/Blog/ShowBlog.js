import React, { useEffect, useState } from 'react';
import '../../../assets/css/showBlog.css';
import LeftAlignedBlog from './LeftAlignedBlog';
import RightAlignedBlog from './RightAlignedBlog';

const ShowBlog = ({ match }) => {

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
    <div>
    {
      blog.menu_design === 0
        ? <LeftAlignedBlog blog={blog} blogOwnerCheck={blogOwnerCheck} />
        : (blog.menu_design === 2
            ? <RightAlignedBlog blog={blog} blogOwnerCheck={blogOwnerCheck} />
            : null
        )
    }
    </div>
  );
};

export default ShowBlog;