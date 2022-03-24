import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

const UserUpdateForm = (user) => {
  const user_info = user.user;

  let updateUser;

  const submitUpdate = (e) => {
    e.preventDefault();
    updateUser = {
      username: $('#username').val(),
      existingPassword: $('#existingPassword').val(),
      password: $('#password').val(),
      passwordCheck: $('#passwordCheck').val(),
      email: $('#email').val(),
      phone: $('#phone').val(),
    };
    if(updateUser.password === updateUser.passwordCheck){
      fetch('http://localhost:8080/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-AUTH-TOKEN': sessionStorage.getItem('token'),
        },
        body: JSON.stringify(updateUser),
      })
      .then(res => res.json())
      .then(res => {
        if (res.responseMessage === 'Update Success') {
          alert('회원정보를 수정했습니다.');
          window.history.go(-1);
        } else {
          alert('기존 비밀번호를 확인해주세요.');
        }
      });
    }else{
      alert('변경하실 비밀번호를 다시 확인해주세요.');
    }
  };

  return (
    <div className='mainPage'>
      <div className='section1'>
        <div className='section1Contents'>
          <h4 className='mainTitle'>Update User Information</h4>
          <div className='divider'></div>
          <form className='signUpForm' onSubmit={submitUpdate}>
            <label className='signUpInfo'>ENTER YOUR EMAIL</label>
            <br />
            <input id='email' name='email' type='email' className='signUpInput'
                   defaultValue={user_info.email} />
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>ENTER YOUR EXISTING PASSWORD
              <i className='signUpExample'></i></label>
            <br />
            <input id='existingPassword' name='existingPassword' type='password'
                   className='signUpInput' />
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>ENTER YOUR PASSWORD</label>
            <br />
            <input id='password' name='password' type='password'
                   className='signUpInput' />
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>ENTER YOUR PASSWORD AGAIN</label>
            <br />
            <input id='passwordCheck' name='passwordCheck' type='password'
                   className='signUpInput' />
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>ENTER YOUR USERNAME</label>
            <br />
            <input id='username' name='username' type='text'
                   className='signUpInput' defaultValue={user_info.username}
            />
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>ENTER YOUR
              PHONE&nbsp;&nbsp;&nbsp;&nbsp;<i className='signUpExample'>ex)
                01012345678</i></label>
            <br />
            <input id='phone' name='phone' type='text' className='signUpInput'
                   defaultValue={user_info.phone} />
            <div className='signUpUnderLine'></div>
            <br />

            <input type='submit' value='Update' className='btn2 btnHover' />
            <Link to='/yamoonjin.com'><input type='button' value='Cancel'
                                             className='btn2 btnHover' /></Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserUpdateForm;