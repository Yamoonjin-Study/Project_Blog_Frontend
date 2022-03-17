import React from 'react';
import SampleImage from '../../../assets/images/user.png';
import BlogUser from './BlogUser';
import NoneBlogUser from './NoneBlogUser';
import { Link } from 'react-router-dom';

const MyPageMain = (user) => {
  const user_info = user.user;

  const withdrawal = () => {
    if (window.confirm('회원 탈퇴하시겠습니까?')) {
      alert('회원 탈퇴 페이지로 이동합니다.');
      window.location.href = '/yamoonjin.com/mypage/withdrawal';
    } else {
      alert('회원탈퇴를 취소하셨습니다.');
    }
  };

  return (
    <div className='myPage'>
      <div className='myPageContents'>
        <div style={{ width: '500px', display: 'inline-block' }}>
          <h4 className='mainTitle'>
            <div style={{ float: 'left' }}>
              <span style={{ fontSize: '30pt' }}>MYPAGE</span><br /><br />
              <button>팔로잉</button>
              <button>팔로워</button>
              <Link to='/yamoonjin.com/mypage/update'>
                <button>회원정보 수정</button>
              </Link>
              <button onClick={withdrawal}>회원 탈퇴</button>
            </div>
            <div style={{ float: 'right' }}>
              <img className='userImage' src={SampleImage} /><br />
              <span>{user_info.username}</span>
            </div>
          </h4>
        </div>
        <br />
        <div className='divider'></div>
        {user_info.blog !== null
          ? <BlogUser blog={user_info.blog} />
          : <NoneBlogUser />
        }
      </div>
    </div>
  );
};

export default MyPageMain;