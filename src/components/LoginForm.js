import React, { useState } from 'react';
import '../assets/css/main.css';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';

const LoginForm = (props) => {

  const [logIn, setLogIn] = useState({
    email:"",
    password:""
  });

  const onChangeValue = (e) => {
    setLogIn({
      ...logIn,
      [e.target.name] : e.target.value
    });
  };

  const submitLogIn = (e) => {
    e.preventDefault();
    console.log(logIn);
    fetch("http://localhost:8080/log-in",{
      method:"POST",
      headers:{
        "Content-Type":"application/json; charset=utf-8"
      },
      body:JSON.stringify(logIn)
    })
    .then(res => res.json())
    .then(res=>{
      console.log(res.responseMessage);
      if(res.responseMessage !== "Login Fail"){
        alert(res.user.username + " 님, 반갑습니다.");
        sessionStorage.setItem("token", res.token);
        window.location.replace("/yamoonjin.com");
      }else{
        alert("이메일, 비밀번호를 확인해주세요.");
      }
    });
  };

  return (
    <div className='mainPage'>
      <div className='section1'>
        <div className='section1Contents'>
          <h4 className='mainTitle'>SIGN IN</h4>
          <div className='divider'></div>
          <form className='signUpForm' onSubmit={submitLogIn}>
            <label className='signUpInfo'>ENTER YOUR EMAIL</label>
            <br />
            <input id='email' name='email' type='text' className='signUpInput' onChange={onChangeValue}/>
            <div className='signUpUnderLine'></div>
            <br />
            <label className='signUpInfo'>ENTER YOUR PASSWORD</label>
            <br />
            <input id='password' name='password' type='password' className='signUpInput' onChange={onChangeValue}/>
            <div className='signUpUnderLine'></div>
            <br />
            <input type='submit' value='Sign In' className='btn2 btnHover'/>
            <Link to='/yamoonjin.com/signup'><input type='button' value='Sign Up' className='btn2 btnHover'/></Link>
            <Link to='/yamoonjin.com'><input type='button' value='Cancel' className='btn2 btnHover'/></Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LoginForm);