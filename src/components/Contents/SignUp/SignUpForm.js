import React, { useState } from 'react';
import '../../../assets/css/main.css';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';

const SignUpForm = (props) => {

  const [signUp, setSignUp] = useState({
    username:"",
    password:"",
    passwordCheck:"",
    nickname:"",
    email:"",
    phone:""
  });

  const onChangeValue = (e) => {
    setSignUp({
      ...signUp,
      [e.target.name] : e.target.value
    });
  }

  const submitSignUp = (e) => {
    e.preventDefault();
    console.log(signUp);
    fetch("http://localhost:8080/sign-up",{
      method:"POST",
      headers:{
        "Content-Type":"application/json; charset=utf-8"
      },
      body:JSON.stringify(signUp)
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
          <h4 className='mainTitle'>SIGN UP</h4>
          <div className='divider'></div>
          <form className='signUpForm' onSubmit={submitSignUp}>
            <label className='signUpInfo'>ENTER YOUR EMAIL</label>
            <br />
            <input id='email' name='email' type='email'className='signUpInput' onChange={onChangeValue}/>
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>ENTER YOUR PASSWORD</label>
            <br />
            <input id='password' name='password' type='password' className='signUpInput' onChange={onChangeValue}/>
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>ENTER YOUR PASSWORD AGAIN</label>
            <br />
            <input id='passwordCheck' name='passwordCheck' type='password' className='signUpInput' onChange={onChangeValue}/>
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>ENTER YOUR USERNAME</label>
            <br />
            <input id='username' name='username' type='text' className='signUpInput' onChange={onChangeValue}/>
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>ENTER YOUR NICKNAME</label>
            <br />
            <input id='nickname' name='nickname' type='text'className='signUpInput' onChange={onChangeValue}/>
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>ENTER YOUR PHONE&nbsp;&nbsp;&nbsp;&nbsp;<i className='signUpExample'>ex) 01012345678</i></label>
            <br />
            <input id='phone' name='phone' type='text' className='signUpInput' onChange={onChangeValue}/>
            <div className='signUpUnderLine'></div>
            <br />

            <input type='submit' value='Sign Up' className='btn2 btnHover' onChange={onChangeValue}/>
            <Link to='/yamoonjin.com'><input type='button' value='Cancel' className='btn2 btnHover'/></Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SignUpForm);