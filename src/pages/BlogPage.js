import React from 'react';
import BlogMain from '../components/Contents/Blog/BlogMain';
import { Route } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import BlogFooter from '../components/Footer/BlogFooter';
import CreateBlogForm from '../components/Contents/Blog/CreateBlogForm';
import ShowBlogPage from './ShowBlogPage';

const BlogPage = () => {
  return (
    <div>
      <Route path='/yamoonjin.com/blog' exact={true} component={BlogMain} />
      <Route path='/yamoonjin.com/blog/:name' component={ShowBlogPage} />
      <Route path='/yamoonjin.com/blogCreate' exact={true} component={CreateBlogForm} />
      <Route path='/yamoonjin.com/blog' exact={true} component={Footer} />
      <Route path='/yamoonjin.com/blogCreate' exact={true} component={Footer} />
      <Route path='/yamoonjin.com/blog/:name' component={BlogFooter} />
    </div>
  );
};

export default BlogPage;