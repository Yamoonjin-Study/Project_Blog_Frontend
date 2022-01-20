import React, { useEffect, useState } from 'react';
import '../assets/css/showBlog.css';
import BlogSetting from '../components/Contents/Blog/BlogSetting';
import BlogDetail from '../components/Contents/Blog/BlogDetail';
import BlogFooter from '../components/Footer/BlogFooter';
import { Route } from 'react-router-dom';

const ShowBlogPage = ({ match }) => {

  const blogname = match.params.name;
  const [blogOwnerCheck, setBlogOwnerCheck] = useState('');
  const [blog, setBlog] = useState({
    id: '',
    blogName: '',
    info: '',
    iconImage: '',
    createDate: '',
    status: '',
    logoImage: '',
    mainContent: '',
    menuDesign: '',
    category: '',
    businessCard:'',
    portfolio:'',
    resume:'',
  });

  const [blogDesign, setBlogDesign] = useState({
    section: '',
    menu: '',
  });

  const blogLeftDesign = {
    section: 'showBlogLeftSection',
    menu: 'showBlogLeftMenu',
  };

  const blogRightDesign = {
    section: 'showBlogRightSection',
    menu: 'showBlogRightMenu',
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
      if (res.blogName === blogname) {
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
    window.location.href = '/yamoonjin.com/blog/' + blog.blogName;
  };

  useEffect(() => {
    if (blog.menuDesign === 0) {
      setBlogDesign(blogLeftDesign);
    } else if (blog.menuDesign === 2) {
      setBlogDesign(blogRightDesign);
    }
  }, [blog]);


  console.log(blog);
  return (
    <div>
      <Route path={'/yamoonjin.com/blog/' + blogname}>
        <BlogDetail blog={blog} blogOwnerCheck={blogOwnerCheck}
                    blogDesign={blogDesign} goMain={goMain} />
      </Route>
      <Route path={'/yamoonjin.com/blog/' + blogname + '/settings'} exact={true}>
        {
          blogOwnerCheck === 'true'
            ? <BlogSetting blog={blog} blogOwnerCheck={blogOwnerCheck}
                           goMain={goMain} blogDesign={blogDesign} />
            : <h2>해당 url에 접근 권한이 없습니다.</h2>
        }
      </Route>

      <BlogFooter blog={blog} />
    </div>
  );
};

export default ShowBlogPage;