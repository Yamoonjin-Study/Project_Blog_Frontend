import React, { useEffect, useState } from 'react';
import BlogMain from '../components/Contents/Blog/BlogMain';
import { Route } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import ShowBlogPage from './ShowBlogPage';

const BlogPage = () => {

  const [blogCheck, setBlogCheck] = useState();

  useEffect(() => {
    fetch('http://localhost:8080/blog/myBlog', {
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res => res.json())
    .then(res => {
      setBlogCheck(res.existence);
      if (blogCheck === false) {
        alert('블로그를 생성해주세요.');
        window.location.replace('/yamoonjin.com/blogCreate');
      }
    });
  });

  return (
    <div>
      <Route path='/yamoonjin.com/blog' exact={true} component={BlogMain} />
      <Route path='/yamoonjin.com/blog/:name' component={ShowBlogPage} />
      <Route path='/yamoonjin.com/blog' exact={true} component={Footer} />
      <Route path='/yamoonjin.com/blogCreate' exact={true} component={Footer} />
    </div>
  );
};

export default BlogPage;