import React, { useEffect, useState } from 'react';
import ChatNavigation from '../components/Contents/Chat/ChatNavigation';
import '../assets/css/chat.css';
import { Route } from 'react-router-dom';
import ChatForm from '../components/Contents/Chat/ChatForm';
import socket from '../config/socket';
import $ from 'jquery';

const ChatPage = () => {
  const blogName = sessionStorage.getItem('blog_name');
  const [blogCheck, setBlogCheck] = useState();
  const [blog, setBlog] = useState({});
  const [chatList, setChatList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/blog/' + blogName, {
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res => res.json())
    .then(res => {
      if (res.responseMessage === 'No Result') {
        alert('블로그를 조회할 수 없습니다. 관리자에게 문의해 주세요.');
      } else {
        setBlog(res.blog);
      }
    });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/chat-list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res => res.json())
    .then(res => {
      setChatList(res);
      console.log(res);
    });
  }, []);

  useEffect(() => {
    socket.on('chat message', ({ chatMessage }) => {
      console.log(chatMessage);
      fetch('http://localhost:8080/chat-list', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-AUTH-TOKEN': sessionStorage.getItem('token'),
        },
      })
      .then(res => res.json())
      .then(res => {
        setChatList(res);
        console.log(res);
      });
    });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/blog/myBlog', {
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res => res.json())
    .then(res => {
      setBlogCheck(res.existence);
      if (blogCheck === false) {
        alert('블로그를 생성하셔야 채팅기능을 사용하실 수 있습니다.');
        window.location.replace('/yamoonjin.com/blogCreate');
      }
    });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/blog/showFollowingList/' + blogName, {
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res => res.json())
    .then(res => {
      setFollowingList(res);
    });

    fetch('http://localhost:8080/blog/showFollowerList/' + blogName, {
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res => res.json())
    .then(res => {
      setFollowerList(res);
    });
  }, []);

  return (
    <div className='chatPage'>
      <ChatNavigation blog={blog} followingList={followingList}
                      followerList={followerList} chatList={chatList} />
      <Route path='/yamoonjin.com/chat/room/:roomId/:chatRoomName'
             component={ChatForm} />
    </div>
  );
};

export default ChatPage;