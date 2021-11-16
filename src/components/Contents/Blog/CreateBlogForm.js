import React, { useState } from 'react';
import '../../../assets/css/main.css';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';

const CreateBlogForm = (props) => {
  const [createBlog, setCreateBlog] = useState({
    username:"",
    password:"",
    passwordCheck:"",
    nickname:"",
    email:"",
    phone:""
  });

  const onChangeValue = (e) => {
    setCreateBlog({
      ...createBlog,
      [e.target.name] : e.target.value
    });
  }

  const submitCreateBlog = (e) => {
    e.preventDefault();
    console.log(createBlog);
    fetch("http://localhost:8080/sign-up",{
      method:"POST",
      headers:{
        "Content-Type":"application/json; charset=utf-8",
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
      body:JSON.stringify(createBlog)
    })
    .then(res => res.json())
    .then(res=>{
      if(res.responseMessage === "Signup Success"){
        alert("회원가입을 축하합니다.");
        props.history.push('/yamoonjin.com');
      }else{
        alert("회원가입에 실패하였습니다.");
      }
    });
  }

  return (
    <div className='mainPage'>
      <div className='section1'>
        <div className='section1Contents'>
          <h4 className='mainTitle'>Blog Creation</h4>
          <div className='divider'></div>
          <form className='signUpForm' onSubmit={submitCreateBlog}>
            <label className='signUpInfo'>BLOG NAME</label>
            <br />
            <input id='name' name='name' type='text'className='signUpInput' onChange={onChangeValue}/>
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>BLOG INFORMATION</label>
            <br />
            <input id='info' name='info' type='text' className='signUpInput' onChange={onChangeValue}/>
            <div className='signUpUnderLine'></div>
            <br />


            <label className='signUpInfo'>BLOG CATEGORY&nbsp;&nbsp;&nbsp;&nbsp;<i className='signUpExample'>Personal Blog or Business Blog</i></label>
            <br />
            <select id='category' name='category' className='categorySelect'>
              <option value='PERSONAL'>PERSONAL</option>
              <option value='BUSINESS'>BUSINESS</option>
            </select>
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>BLOG MAIN SCREEN CONTENT&nbsp;&nbsp;&nbsp;&nbsp;
              <i className='signUpExample'>If the content does not exist, a blank space appears on the main screen.</i></label>
            <br />
            <select id='design_form' name='design_form' className='categorySelect'>
              <option value='0'>None</option>
              <option value='1'>Your Business Card</option>
              <option value='2'>Your Profile</option>
              <option value='3'>Your Board</option>
            </select>
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>BLOG ICON</label>
            <br />
            <input id='nickname' name='nickname' type='file'className='signUpInput' onChange={onChangeValue}/>
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>BLOG LOGO IMAGE&nbsp;&nbsp;&nbsp;&nbsp;<i className='signUpExample'>ex) 01012345678</i></label>
            <br />
            <input id='phone' name='phone' type='file' className='signUpInput' onChange={onChangeValue}/>
            <div className='signUpUnderLine'></div>
            <br />

            <Link to='/yamoonjin.com'><input type='button' value='Cancel' className='btn2 btnHover'/></Link>
            <input type='button' value='Preview' className='btn2 btnHover'/>
            <input type='submit' value='Create' className='btn2 btnHover'/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CreateBlogForm);