import React from 'react';
import BlogMain from '../components/Contents/Blog/BlogMain';
import { Route } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import ShowBlogPage from './ShowBlogPage';

const BlogPage = () => {
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