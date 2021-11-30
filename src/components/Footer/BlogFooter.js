import React, { useEffect, useState } from 'react';
import '../../assets/css/blogFooter.css';

const BlogFooter = ({ match }) => {

  const blogname = match.params.name;
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

  useEffect(() => {
    //블로그 호출
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
        ? 'blogFooterLeftDiv'
        : (blog.menu_design === 2
            ? 'blogFooterRightDiv'
            : null
        )
    }>
      <span>
        <h2>{blog.name} 블로그 입니다.</h2>
        <h2>information : {blog.info}</h2>
        <h2>since : {blog.create_date.split('T').at(0)}</h2>
      </span>
    </div>
  );
};

export default BlogFooter;