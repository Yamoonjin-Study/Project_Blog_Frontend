import React, { useEffect, useState } from 'react';
import Bell from '../../assets/images/bell.png';
import Blog from '../../assets/images/blog.png';
import Chat from '../../assets/images/chat.png';
import Logo from '../../assets/images/logo.png';
import Archive from '../../assets/images/archive.png';
import User from '../../assets/images/user.png';
import { Link } from 'react-router-dom';
import '../../assets/css/navigation.css';
import socket from '../../config/socket';
import $ from 'jquery';
import AlarmList from '../Contents/Alarm/AlarmList';

const Navigation = () => {

  const token = sessionStorage.getItem('token');
  const [blogName, setBlogName] = useState('');
  const [alarmVisible, setAlarmVisible] = useState('invisible');
  const [alarmList, setAlarmList] = useState([]);

  useEffect(() => {
    socket.on('alarm message', ({ alarmMessage, fromUser }) => {
      $('.alarmDisplay').css('display', 'inline-block');
      fetch('http://localhost:8080/show-alarm', {
        method: 'GET',
        headers: {
          'X-AUTH-TOKEN': token,
        },
      })
      .then(res => res.json())
      .then(res => {
        if (res.length > 0) {
          setAlarmList(res);
          if (res[res.length - 1].status === 'UnRead') {
            $('.alarmDisplay').css('display', 'inline-block');
          } else {
            $('.alarmDisplay').css('display', 'none');
          }
        }
      });
    });
  }, [socket]);

  useEffect(() => {
    fetch('http://localhost:8080/blog/myBlog', {
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res => res.json())
    .then(res => {
      setBlogName(res.blogName);
    });
  });

  const AlarmCheck = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/check-alarm', {
      method: 'PUT',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res => res.text())
    .then(res => {
      console.log(res);
    });
    if ($('.alarmVisible').val() === 'invisible') {
      $('.alarmDisplay').css('display', 'none');
      $('.alarmList').css('display', 'block');
      $('.alarmList').css('height', '400px');
      setAlarmVisible('visible');
      $('.alarmList').scrollTop($('.alarmList')[0].scrollHeight);
    } else if ($('.alarmVisible').val() === 'visible') {
      $('.alarmList').css('height', '0px');
      setAlarmVisible('invisible');
    }
  };

  const LogOut = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/log-out', {
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': token,
      },
    })
    .then(res => res.json())
    .then(res => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user_id');
      alert('로그아웃 되었습니다.');
      window.location.replace('/yamoonjin.com');
    });
  };

  useEffect(() => {
    fetch('http://localhost:8080/show-alarm', {
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': token,
      },
    })
    .then(res => res.json())
    .then(res => {
      if (res.length > 0) {
        setAlarmList(res);
        if (res[res.length - 1].status === 'UnRead') {
          $('.alarmDisplay').css('display', 'inline-block');
        } else {
          $('.alarmDisplay').css('display', 'none');
        }
      }
    });
  }, []);

  return (
    <div className='mainNavi'>
      <Link to='/yamoonjin.com' className='linkStyle'>
        HOME<img src={Logo} className='homeIcon' alt='home' />
      </Link>
      <Link to='' className='linkStyle' onClick={AlarmCheck}>
        ALARM<img src={Bell} className='naviIcon' alt='alarm' />
        <div className='alarmDisplay'></div>
        <input type='text'
               className='alarmVisible'
               style={{ display: 'none' }}
               value={alarmVisible}
               readOnly={true}></input>
      </Link>
      <div className='alarmList'>
        {
          alarmList.length === 0
            ? <i className='alarmNull'>알림 메시지가 없습니다.</i>
            : <AlarmList alarmList={alarmList} />
        }
      </div>
      <Link to='/yamoonjin.com/chat' className='linkStyle'>
        CHAT<img src={Chat} className='naviIcon' alt='chat' />
      </Link>
      <Link to={'/yamoonjin.com/blog/' + blogName} className='linkStyle'>
        MY BLOG<img src={Blog} className='naviIcon' alt='blog' />
      </Link>
      <Link to={'/yamoonjin.com/blog/' + blogName + '/archive/list'}
            className='linkStyle'>
        MY ARCHIVE<img src={Archive} className='naviIcon' alt='portfolio' />
      </Link>
      <Link to='/yamoonjin.com/mypage'>
        <button className='naviBtn'>
          MYPAGE
        </button>
      </Link>
      &nbsp;&nbsp;&nbsp;
      <button className='naviBtn' onClick={LogOut}>
        LOGOUT
      </button>
      <img src={User} className='userIcon' alt='user' />
    </div>
  );
};
export default React.memo(Navigation);