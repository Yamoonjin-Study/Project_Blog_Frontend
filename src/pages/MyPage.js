import React from 'react';

const MyPage = () => {
  let user_info;
  const user_id = sessionStorage.getItem('user_id');
  const token = sessionStorage.getItem('token');

  fetch("http://localhost:8080/userinfo/" + user_id, {
    method: 'GET',
    headers:{
      'X-AUTH-TOKEN' : token,
    }
  })
  .then(res => {
    return res.json();
  })
  .then(res => {
    user_info = JSON.stringify(res);
  });

  return (
    <div style={{height:'500px'}}>
    </div>
  );
};

export default MyPage;