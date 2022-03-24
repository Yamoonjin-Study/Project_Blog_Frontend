import React, { useState } from 'react';
import BlogSetting_info from './BlogSetting_info';
import BlogSetting_design from './BlogSetting_design';
import BlogSetting_archives from './BlogSetting_archives';

const BlogSetting = ({ blog, blogOwnerCheck, goMain, blogDesign }) => {

  const blog_info = blog;

  const [settingForm, setSettingForm] = useState('blog_info');

  const onClickMenu = (e) => {
    if (e.target.name === 'blog_info') {
      setSettingForm('blog_info');
    } else if (e.target.name === 'blog_design') {
      setSettingForm('blog_design');
    } else {
      setSettingForm('blog_archives');
    }
  };

  return (
    <div className={blogDesign.section}>
      <div className='showBlogContent'>
        <h4 className='mainTitle'>Blog Settings</h4>
        <div className='divider'></div>
        <button className='btn2 btnHover' name='blog_info'
                onClick={onClickMenu}>Blog Info
        </button>
        <button className='btn2 btnHover' name='blog_design'
                onClick={onClickMenu}>Blog Design
        </button>
        <button className='btn2 btnHover' name='blog_archives'
                onClick={onClickMenu}>Blog Archives
        </button>
        <br />
        <br />
        <br />
        <br />
        {
          settingForm === 'blog_info'
          ? <BlogSetting_info blog_info={blog_info} />
          : (
            settingForm === 'blog_design'
              ? <BlogSetting_design blog_info={blog_info} />
              : <BlogSetting_archives blog_info={blog_info} />
          )
        }
      </div>
    </div>
  );
};

export default BlogSetting;