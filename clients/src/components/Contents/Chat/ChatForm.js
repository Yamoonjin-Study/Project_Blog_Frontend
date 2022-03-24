import React, { useEffect, useState } from 'react';
import '../../../assets/css/chat.css';
import $ from 'jquery';
import socket from '../../../config/socket';

const ChatForm = (props) => {
  let chatRoomId = window.location.pathname.split('/').at(4);
  const chatRoomName = props.match.params.chatRoomName;
  const [chatMessages, setChatMessages] = useState([]);
  const blogName = sessionStorage.getItem('blog_name');

  useEffect(() => {
    chatRoomId = window.location.pathname.split('/').at(4);
    console.log(chatRoomId);
    fetch('http://localhost:8080/chat-room/' + chatRoomId, {
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res => res.json())
    .then(res => {
      fetch('http://localhost:8080/read-chat-room/' + chatRoomId, {
        method: 'PUT',
        headers: {
          'X-AUTH-TOKEN': sessionStorage.getItem('token'),
        },
      })
      .then(res=>res)
      .then(res);

      console.log(res.chatMessages);
      setChatMessages(res.chatMessages);
      $('.chatForm').scrollTop($('.chatForm').scrollHeight);
    });
  }, [chatRoomId]);

  useEffect(() => {
    socket.on('chat message', ({ chatMessage }) => {
      chatRoomId = window.location.pathname.split('/').at(4);
      console.log(chatRoomId);
      console.log(chatMessage);
      fetch('http://localhost:8080/chat-room/' + chatRoomId, {
        method: 'GET',
        headers: {
          'X-AUTH-TOKEN': sessionStorage.getItem('token'),
        },
      })
      .then(res => res.json())
      .then(res => {
        setChatMessages(res.chatMessages);
        $('.chatForm').scrollTop($('.chatForm')[0].scrollHeight);
      });
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    let sendChatMessage;
    sendChatMessage = {
      message: $('.chatMessageTextArea').val(),
      chatRoomId: chatRoomId,
    };
    fetch('http://localhost:8080/chat-send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
      body: JSON.stringify(sendChatMessage),
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      $('.chatMessageTextArea').val('');
      let toUsers = res.chatRoom.chatUsers;
      socket.emit('sendChat', { toUsers }, (callback) => {
        if (callback) {
          console.log(callback);
        }
      });
    });
  };

  function dateFormat(date) {
    let create_date = new Date(date);
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
    <div className='chatSection'>
      <div className='chatForm'>
        <div className='presentChatRoom'>
          {
            chatRoomName
          }
        </div>
        {chatMessages.map((chatMessage) => (
          <div key={chatMessage.id}>
            {
              chatMessage.sender.blog.blogName !== blogName
                ? <div>
                  <img className='chatSenderImage'
                       width='30px' height='30px'
                       src={chatMessage.sender.blog.iconImage} />
                  {chatMessage.sender.blog.blogName}<br />
                </div>
                : null
            }
            <div className={
              chatMessage.sender.blog.blogName === blogName
                ? 'chatMessageBoxRight'
                : 'chatMessageBoxLeft'
            }>
              {
                chatMessage.sender.blog.blogName !== blogName
                  ? <div>
                    <div className='triangleDivLeft'></div>
                    <div className='emptySpace'></div>
                  </div>
                  : <div className='triangleDivRight'></div>
              }
              {chatMessage.message}
              - {chatMessage.chatRoom.chatUsers.length
              - chatMessage.readers.length}
              <br /> {dateFormat(chatMessage.sendDate)}
            </div>
          </div>
        ))}
      </div>
      <div className='chatSendDiv'><textarea className='chatMessageTextArea' />
        <button className='chatSendBtn btn1 btnHover' onClick={sendMessage}>전송
        </button>
      </div>
    </div>
  );
};

export default ChatForm;