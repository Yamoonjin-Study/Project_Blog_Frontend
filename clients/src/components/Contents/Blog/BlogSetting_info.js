import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

const BlogSetting_info = (blog_info) => {

  const blog_information = blog_info.blog_info;

  let updateBlogInfo;

  const submitCreateBlog = (e) => {
    e.preventDefault();
    updateBlogInfo = {
      blogName: $("input[name='blogName']").val(),
      info: $("input[name='info']").val(),
      category: $("select[name='category']").val(),
      // icon: '',
      // logo_image: '',
      // main_content: '',
      // menu_design: '',
    };
    fetch('http://localhost:8080/update-blog-info', {
      method: 'PUT',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(updateBlogInfo),
    })
    .then(res => res.json())
    .then(res => {
      if(res.responseMessage === 'Update Blog Success'){
        alert('블로그 정보가 수정되었습니다.');
        window.location.reload();
      }else{
        alert('블로그 정보 수정에 실패했습니다.')
      }
    });
  };
  return (
    <form className='signUpForm' encType='multipart/form-data'
          onSubmit={submitCreateBlog}>
      <label className='signUpInfo'>BLOG NAME</label>
      <br />
      <input id='blogName' name='blogName' type='text' className='signUpInput'
             defaultValue={blog_information.blogName} />
      <div className='signUpUnderLine'></div>
      <br />

      <label className='signUpInfo'>BLOG INFORMATION</label>
      <br />
      <input id='info' name='info' type='text' className='signUpInput'
             defaultValue={blog_information.info} />
      <div className='signUpUnderLine'></div>
      <br />


      <label className='signUpInfo'>BLOG CATEGORY&nbsp;&nbsp;&nbsp;&nbsp;<i
        className='signUpExample'>Personal Blog or Business Blog</i></label>
      <br />
      <br />
      <select id='category' name='category' className='settingSelect'
              defaultValue={blog_information.category}>
        <option value='none'>=== 선택 ===</option>
        <option value='PERSONAL'>PERSONAL</option>
        <option value='BUSINESS'>BUSINESS</option>
      </select>
      <div className='signUpUnderLine'></div>
      <br />

      <input type='submit' value='Update' className='btn2 btnHover' />
      <Link to='/yamoonjin.com/blog'><input type='button' value='Cancel'
                                            className='btn2 btnHover' /></Link>
    </form>
  );
};

export default BlogSetting_info;