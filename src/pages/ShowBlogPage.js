import React, { useEffect, useState } from 'react';
import '../assets/css/showBlog.css';
import BlogSetting from '../components/Contents/Blog/BlogSetting';
import BlogDetail from '../components/Contents/Blog/BlogDetail';

const ShowBlogPage = ({ match }) => {

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

  const blogLeftDesign = {
    section: 'showBlogLeftSection',
    menu: 'showBlogLeftMenu'
  };

  const blogRightDesign = {
    section: 'showBlogRightSection',
    menu: 'showBlogRightMenu'
  };

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

  const goMain = () => {
    window.location.href = '/yamoonjin.com/blog/' + blog.name;
  };

  return (
    <div>
      {
        window.location.pathname.indexOf(
          '/yamoonjin.com/blog/' + blogname + '/settings') === 0 &&
        (
          blogOwnerCheck === 'true'
            ? <BlogSetting blog={blog} blogOwnerCheck={blogOwnerCheck}
                           goMain={goMain} />
            : <h2>해당 url에 접근 권한이 없습니다.</h2>
        )
      }
      {
        window.location.pathname.indexOf(
          '/yamoonjin.com/blog/' + blogname) === 0 &&
        (
          blog.menu_design === 0
          ? <BlogDetail blog={blog} blogOwnerCheck={blogOwnerCheck} blogDesign={blogLeftDesign} goMain={goMain} />
          : (blog.menu_design === 2
              ? <BlogDetail blog={blog} blogOwnerCheck={blogOwnerCheck} blogDesign={blogRightDesign} goMain={goMain} />
              : null
          )
        )
      }
    </div>
  );
};

export default ShowBlogPage;