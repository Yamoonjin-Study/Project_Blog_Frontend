import React from 'react';
import Blog from '../components/Contents/Blog/Blog';
import ShowBlog from '../components/Contents/Blog/ShowBlog';
import { Route } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import BlogFooter from '../components/Footer/BlogFooter';
import CreateBlogForm from '../components/Contents/Blog/CreateBlogForm';

const BlogPage = () => {
  return (
    <div>
      <Route path='/yamoonjin.com/blog' exact={true} component={Blog} />
      <Route path='/yamoonjin.com/blog' exact={true} component={Footer} />
      <Route path='/yamoonjin.com/blog/:name' component={ShowBlog} />
      <Route path='/yamoonjin.com/blog/:name' component={BlogFooter} />
      <Route path='/yamoonjin.com/blogCreate' exact={true} component={CreateBlogForm} />
      <Route path='/yamoonjin.com/blogCreate' exact={true} component={Footer} />
    </div>
  );
};

export default BlogPage;