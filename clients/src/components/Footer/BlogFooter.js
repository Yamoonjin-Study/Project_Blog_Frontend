import React from 'react';
import '../../assets/css/blogFooter.css';

const BlogFooter = ({ blog }) => {

  return (
    <div className={
      blog.menuDesign === 0
        ? 'blogFooterLeftDiv'
        : (blog.menuDesign === 2
            ? 'blogFooterRightDiv'
            : null
        )
    }>
      <span>
        <h2>{blog.blogName} 블로그 입니다.</h2>
        <h2>{blog.info}</h2>
        <h2>since : {blog.createDate.split('T').at(0)}</h2>
      </span>
    </div>
  );
};

export default BlogFooter;