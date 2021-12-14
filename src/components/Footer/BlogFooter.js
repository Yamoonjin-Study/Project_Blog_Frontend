import React from 'react';
import '../../assets/css/blogFooter.css';

const BlogFooter = ({ blog }) => {

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