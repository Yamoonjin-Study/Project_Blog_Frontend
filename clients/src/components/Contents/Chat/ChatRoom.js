import React from 'react';
import './ChatRooms.css';
import { Link } from 'react-router-dom';

const ChatRoom = (chat, props) => {
  const chatInfo = chat.chat;
  const chatUsersInfo = chatInfo.chatUsers;
  const blogName = sessionStorage.getItem('blog_name');
  let ifNoChatRoomName = '';
  for (let i = 0; i < chatUsersInfo.length; i++) {
    if (ifNoChatRoomName === '') {
      ifNoChatRoomName = chatUsersInfo[i].blog.blogName;
    } else {
      ifNoChatRoomName = ifNoChatRoomName + ', '
        + chatUsersInfo[i].blog.blogName;
    }
  }

  if (chatUsersInfo.length > 4) {
    ifNoChatRoomName =
      ifNoChatRoomName.split(',').at(0) + ',' +
      ifNoChatRoomName.split(',').at(1) + ',' +
      ifNoChatRoomName.split(',').at(2) + ',' +
      ifNoChatRoomName.split(',').at(3) + '...';
  }

  let create_date = new Date(chatInfo.lastChatMessage);

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
    <Link to={'/yamoonjin.com/chat/room/' + chatInfo.id}>
      <div className='chatRooms'>
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
          {
            chatInfo.chatRoomName === ''
              ? <span>{ifNoChatRoomName}</span>
              : <span>{chatInfo.chatRoomName}</span>
          }<br />
          {dateFormat(create_date)}
        </div>
      </div>
    </Link>
  );
};

export default ChatRoom;