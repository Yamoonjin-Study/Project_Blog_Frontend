import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

const WithdrawalCheck = (user) => {

  const user_info = user.user;
  let withdrawal;

  const submitWithdrawal = (e) => {
    e.preventDefault();
    withdrawal = {
      email: $('#email').val(),
      password: $('#password').val(),
      reason: $('#reason').val(),
    };
    console.log(withdrawal);
    fetch('http://localhost:8080/withdrawal', {
      method: 'POST',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(withdrawal),
    }).then(res => {
      return res.json();
    }).then(res => {
      if(res.responseMessage === 'Withdrawal Success'){
        alert('회원탈퇴 되었습니다. 서비스를 이용해주셔서 감사합니다.')
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user_id');
        window.location.href='/yamoonjin.com';
      }else{
        alert('비밀번호를 다시 확인해주세요.');
      }
    });
  };

  return (
    <div className='mainPage'>
      <div className='section1'>
        <div className='section1Contents'>
          <h4 className='mainTitle'>Withdrawal Page</h4>
          <div className='divider'></div>
          <form className='signUpForm' onSubmit={submitWithdrawal}>
            <label className='signUpInfo'>ENTER YOUR EMAIL</label>
            <br />
            <input id='email' name='email' type='email' className='signUpInput'
                   defaultValue={user_info.email} />
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>ENTER YOUR PASSWORD
              <i className='signUpExample'></i></label>
            <br />
            <input id='password' name='password' type='password'
                   className='signUpInput' />
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>ENTER YOUR REASON FOR YOUR
              WITHDRAWAL &nbsp;&nbsp;&nbsp;
              <i className='signUpExample'>It will help us to develop the site
                operation in the future.</i></label>
            <br />
            <input id='reason' name='reason' type='text'
                   className='signUpInput' />
            <div className='signUpUnderLine'></div>
            <br />

            <input type='submit' value='Submit' className='btn2 btnHover' />
            <Link to='/yamoonjin.com'><input type='button' value='Cancel'
                                             className='btn2 btnHover' /></Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalCheck;