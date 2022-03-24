import React, { useState } from 'react';
import '../../../assets/css/main.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Footer from '../../Footer/Footer';

const CreateBlogForm = (props) => {

  const [createBlog, setCreateBlog] = useState({
    blogName: '',
    info: '',
    category: '',
    menuDesign: '',
    mainContent: '',
  });

  const onChangeValue = (e) => {
    setCreateBlog({
      ...createBlog,
      [e.target.name]: e.target.value,
    });
  };

  const formData = new FormData();

  const onChangeFile = (e) => {
    formData.append(e.target.name, e.target.files[0]);
  };

  const submitCreateBlog = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/create-blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
      body: JSON.stringify(createBlog),
    })
    .then(res => res.json())
    .then(res => {
      if (res.responseMessage === 'Create Blog Success') {
        fetch('http://localhost:8080/save-file', {
          method: 'POST',
          headers: {
            'X-AUTH-TOKEN': sessionStorage.getItem('token'),
          },
          body: formData,
        })
        .then(res)
        .then(res => {
          alert('블로그 생성을 축하합니다.');
          props.history.push('/yamoonjin.com/blog/' + createBlog.blogName);
        });
      } else {
        alert('블로그 생성에 실패하였습니다.');
      }
    });
  };

  return (
    <div className='mainPage'>
      <div className='section1'>
        <div className='section1Contents'>
          <h4 className='mainTitle'>Blog Creation</h4>
          <div className='divider'></div>
          <form className='signUpForm' encType='multipart/form-data'
                onSubmit={submitCreateBlog}>
            <label className='signUpInfo'>BLOG NAME</label>
            <br />
            <input id='blogName' name='blogName' type='text'
                   className='signUpInput' onChange={onChangeValue} />
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>BLOG INFORMATION</label>
            <br />
            <input id='info' name='info' type='text' className='signUpInput'
                   onChange={onChangeValue} />
            <div className='signUpUnderLine'></div>
            <br />


            <label className='signUpInfo'>BLOG CATEGORY&nbsp;&nbsp;&nbsp;&nbsp;
              <i className='signUpExample'>Personal Blog or Business
                Blog</i></label>
            <br />
            <br />
            <select id='category' name='category' className='settingSelect'
                    onChange={onChangeValue}>
              <option value='none'>=== 선택 ===</option>
              <option value='PERSONAL'>PERSONAL</option>
              <option value='BUSINESS'>BUSINESS</option>
            </select>
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>BLOG MAIN SCREEN
              CONTENT&nbsp;&nbsp;&nbsp;&nbsp;
              <i className='signUpExample'>If the content does not exist, a
                blank space appears on the main screen.</i></label>
            <br />
            <br />
            <select id='mainContent' name='mainContent'
                    className='settingSelect' onChange={onChangeValue}>
              <option value='none'>=== 선택 ===</option>
              <option value='0'>Your Board List</option>
              <option value='1'>Your Business Card</option>
              <option value='2'>Your Profile</option>
              <option value='3'>Your Board</option>
            </select>
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>BLOG MENU
              DESIGN&nbsp;&nbsp;&nbsp;&nbsp;
              <i className='signUpExample'>Set the position of the
                menu.</i></label>
            <br />
            <br />
            <select id='menuDesign' name='menuDesign' className='settingSelect'
                    onChange={onChangeValue}>
              <option value='none'>=== 선택 ===</option>
              <option value='0'>LEFT</option>
              <option value='1'>TOP</option>
              <option value='2'>RIGHT</option>
            </select>
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>BLOG ICON</label>
            <br />
            <input id='iconImage' name='iconImage' type='file'
                   accept='image/gif, image/jpeg, image/png'
                   className='signUpInput' onChange={onChangeFile}
                   required={true} />
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>BLOG LOGO
              IMAGE&nbsp;&nbsp;&nbsp;&nbsp;<i
                className='signUpExample'></i></label>
            <br />
            <input id='logoImage' name='logoImage' type='file'
                   accept='image/gif, image/jpeg, image/png'
                   className='signUpInput' onChange={onChangeFile}
                   required={true} />
            <div className='signUpUnderLine'></div>
            <br />

            <input type='submit' value='Create' className='btn2 btnHover' />
            <Link to='/yamoonjin.com/blog'><input type='button' value='Cancel'
                                                  className='btn2 btnHover' /></Link>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withRouter(CreateBlogForm);