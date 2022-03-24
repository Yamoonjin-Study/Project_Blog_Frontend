import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

const BlogSetting_design = (blog_info) => {
  const blog_information = blog_info.blog_info;

  const formData = new FormData();

  const onChangeFile = (e) => {
    formData.append(e.target.name, e.target.files[0]);
  };

  let updateBlogDesign;

  const submitCreateBlog = (e) => {
    e.preventDefault();
    updateBlogDesign = {
      iconImage: $('input[name=\'iconImage\']').val(),
      logoImage: $('input[name=\'logoImage\']').val(),
      mainContent: $('select[name=\'mainContent\']').val(),
      menuDesign: $('select[name=\'menuDesign\']').val(),
    };
    fetch('http://localhost:8080/update-blog-design', {
      method: 'PUT',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(updateBlogDesign),
    })
    .then(res => res.json())
    .then(res => {
      if (res.responseMessage === 'Update Blog Success') {
        let fetchUrl;
        if(formData.get('iconImage') !== null || formData.get('logoImage') !== null){
          if (formData.get('iconImage') !== null && formData.get('logoImage') //icon & logo 둘다 변경할 경우.
            !== null) {
            fetchUrl = 'http://localhost:8080/save-file';
          } else if (formData.get('iconImage') !== null && formData.get('logoImage')//icon만 변경할 경우.
            === null) {
            fetchUrl = 'http://localhost:8080/save-icon-file';
          } else if (formData.get('iconImage') === null && formData.get('logoImage')//logo만 변경할 경우.
            !== null) {
            fetchUrl = 'http://localhost:8080/save-logo-file';
          } else {//icon & logo 둘다 변경하지 않은 경우.
            alert('블로그 정보가 수정되었습니다.(no images)');
            window.location.reload();
          }
          fetch(fetchUrl, {
            method: 'POST',
            headers: {
              'X-AUTH-TOKEN': sessionStorage.getItem('token'),
            },
            body: formData,
          })
          .then(res)
          .then(res => {
            alert('블로그 정보가 수정되었습니다.');
            window.location.reload();
          });
        }else{
          alert('블로그 정보가 수정되었습니다.');
          window.location.reload();
        }
      } else {
        alert('블로그 정보 수정에 실패했습니다.');
      }
    });
  };
  return (
    <form className='signUpForm' encType='multipart/form-data'
          onSubmit={submitCreateBlog}>
      <label className='signUpInfo' style={{marginLeft:'-12px'}}>BLOG MAIN SCREEN
        CONTENT&nbsp;&nbsp;&nbsp;&nbsp;
        <i className='signUpExample'>If the content does not exist, a blank
          space appears on the main screen.</i></label>
      <br />
      <br />
      <select id='mainContent' name='mainContent' className='settingSelect'
              defaultValue={blog_information.mainContent}>
        <option value='none'>=== 선택 ===</option>
        <option value='0'>Your Board List</option>
        <option value='1'>Your Business Card</option>
        <option value='2'>Your Profile</option>
        <option value='3'>Your Board</option>
      </select>
      <div className='signUpUnderLine'></div>
      <br />

      <label className='signUpInfo'>BLOG MENU DESIGN&nbsp;&nbsp;&nbsp;&nbsp;
        <i className='signUpExample'>Set the position of the menu.</i></label>
      <br />
      <br />
      <select id='menuDesign' name='menuDesign' className='settingSelect'
              defaultValue={blog_information.menuDesign}>
        <option value='none'>=== 선택 ===</option>
        <option value='0'>LEFT</option>
        <option value='1'>TOP</option>
        <option value='2'>RIGHT</option>
      </select>
      <div className='signUpUnderLine'></div>
      <br />

      <label className='signUpInfo'>BLOG ICON&nbsp;&nbsp;&nbsp;&nbsp;
        <i className='signUpExample'>If there is no value, the previously set value is maintained.</i></label>
      <br />
      <input id='iconImage' name='iconImage' type='file'
             accept='image/gif, image/jpeg, image/png' className='signUpInput'
             onChange={onChangeFile} />
      <div className='signUpUnderLine'></div>
      <br />

      <label className='signUpInfo'>BLOG LOGO IMAGE&nbsp;&nbsp;&nbsp;&nbsp;
        <i className='signUpExample'>If there is no value, the previously set value is maintained.</i></label>
      <br />
      <input id='logoImage' name='logoImage' type='file'
             accept='image/gif, image/jpeg, image/png' className='signUpInput'
             onChange={onChangeFile} />
      <div className='signUpUnderLine'></div>
      <br />

      <input type='submit' value='Update' className='btn2 btnHover' />
      <Link to='/yamoonjin.com/blog'><input type='button' value='Cancel'
                                            className='btn2 btnHover' /></Link>
    </form>
  );
};

export default BlogSetting_design;