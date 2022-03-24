import React, { useEffect, useState } from 'react';
import './ChatRooms.css';
import { Link } from 'react-router-dom';
import $ from 'jquery';

const ChatRoom = (chatRoom) => {
  const chatInfo = chatRoom.chatRoom;
  const chatUsersInfo = chatInfo.chatUsers;
  const blogName = sessionStorage.getItem('blog_name');
  let ChatRoomName = chatInfo.chatRoomName;
  let ifNoChatRoomName = '';
  // const [readCheck, setReadCheck] = useState(true);

  for (let i = 0; i < chatUsersInfo.length; i++) {
    if (ifNoChatRoomName === '') {
      ifNoChatRoomName = chatUsersInfo[i].blog.blogName;
    } else {
      ifNoChatRoomName = ifNoChatRoomName + ', '
        + chatUsersInfo[i].blog.blogName;
    }
  }

  // fetch('http://localhost:8080/chat-room/' + chatInfo.id, {
  //   method: 'GET',
  //   headers: {
  //     'X-AUTH-TOKEN': sessionStorage.getItem('token'),
  //   },
  // })
  // .then(res => res.json())
  // .then(res => {
  //   if (res.chatMessages[res.chatMessages.length - 1].readers[0].blog.blogName
  //     === blogName) {
  //     setReadCheck(true);
  //   } else {
  //     setReadCheck(false);
  //   }
  //   if (readCheck === false) {
  //     $('.alarmDisplay').css('display', 'block');
  //   } else {
  //     $('.alarmDisplay').css('display', 'none');
  //   }
  // });

  if (chatUsersInfo.length > 4) {
    ifNoChatRoomName =
      ifNoChatRoomName.split(',').at(0) + ',' +
      ifNoChatRoomName.split(',').at(1) + ',' +
      ifNoChatRoomName.split(',').at(2) + ',' +
      ifNoChatRoomName.split(',').at(3) + '...';
  }

  if (chatUsersInfo.length < 3) {
    for (let i = 0; i < ifNoChatRoomName.split(',').length; i++) {
      if (ifNoChatRoomName.split(',').at(i) !== blogName) {
        ifNoChatRoomName = ifNoChatRoomName.split(',').at(i);
      }
    }
  }

  if (ChatRoomName === '') {
    ChatRoomName = ifNoChatRoomName;
  }
  let create_date = new Date(chatInfo.lastChatMessageDate);

  function dateFormat(create_date) {
    let month = create_date.getMonth() + 1;
    let day = create_date.getDate();
    let hour = create_date.getHours();
    let minute = create_date.getMinutes();
    let second = create_date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    return create_date.getFullYear() + '-' + month + '-' + day + ' ' + hour
      + ':' + minute + ':' + second;
  }

  return (
    <Link to={'/yamoonjin.com/chat/room/' + chatInfo.id + '/' + ChatRoomName}>
      <div className='chatRooms'>
        {/*<div className='alarmDisplay'></div>*/}
        <div className='chatRoomImg'>
          {
            chatUsersInfo.length > 2
              ? chatUsersInfo.map((chatUsersInfo, index) => (
                index < 4
                  ? <img className='chatRoomUserImg' key={index}
                         src={chatUsersInfo.blog.iconImage} width='30px'
                         height='30px' />
                  : null
              ))
              : chatUsersInfo.map((chatUsersInfo, index) => (
                chatUsersInfo.blog.blogName === blogName
                  ? null
                  : <img className='chatRoomUserImg' key={index}
                         src={chatUsersInfo.blog.iconImage} width='60px'
                         height='60px' />
              ))
          }
        </div>
        <div className='chatRoomInfo'>
          <span>{ChatRoomName}</span>
          <br />
          {dateFormat(create_date)}
        </div>
      </div>
    </Link>
  );
};

export default ChatRoom;