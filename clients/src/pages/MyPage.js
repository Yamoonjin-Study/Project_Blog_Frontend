import React, { useEffect, useState } from 'react';
import '../assets/css/myPage.css';
import { Route } from 'react-router-dom';
import MyPageMain from '../components/Contents/MyPage/MyPageMain';
import UserUpdateForm from '../components/Contents/MyPage/UserUpdateForm';
import WithdrawalCheck from '../components/Contents/MyPage/WithdrawalCheck';

const MyPage = () => {
  const [user, setUser] = useState({});
  const user_id = sessionStorage.getItem('user_id');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:8080/userinfo/' + user_id, {
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': token,
      },
    })
    .then(res => {
      return res.json();
    })
    .then(res => {
      setUser(res);
    });
  }, []);

  return (
    <div>
      <Route path='/yamoonjin.com/mypage' exact={true}>
        <MyPageMain user={user}/>
      </Route>
      <Route path='/yamoonjin.com/mypage/update' exact={true}>
        <UserUpdateForm user={user} />
      </Route><Route path='/yamoonjin.com/mypage/withdrawal' exact={true}>
        <WithdrawalCheck user={user} />
      </Route>
    </div>
  );
};

export default MyPage;