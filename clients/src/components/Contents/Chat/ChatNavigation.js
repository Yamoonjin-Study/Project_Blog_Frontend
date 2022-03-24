import React, { useState } from 'react';
import './ChatNavigation.css';
import SearchImage from '../../../assets/images/search.png';
import ChatRoom from './ChatRoom';
import AddIcon from '../../../assets/images/add.png';
import CloseIcon from '../../../assets/images/close.png';
import CreateChatForm from './CreateChatForm';
import $ from 'jquery';

const ChatNavigation = ({
  blog,
  followerList,
  followingList,
  chatList,
}) => {

  const [chatVisible, setChatVisible] = useState('inVisible');

  const CreateChat = () => {
    if (chatVisible === 'inVisible') {
      $('.chatSearch').css('height', '0');
      $('.createChatRoom').css('background', '#404040');
      $('.createChatRoom').css('color', 'white');
      $('.createChatRoomIcon').attr('src', CloseIcon);
      $('.createChatRoomIcon').css('filter', 'invert(100%');
      $('.createChatForm').css('height', '100%');
      $('.chatList').css('opacity', '0');
      setChatVisible('Visible');
    } else {
      $('.chatSearch').css('height', '23px');
      $('.createChatRoom').css('background', 'transparent');
      $('.createChatRoom').css('color', 'black');
      $('.createChatRoomIcon').attr('src', AddIcon);
      $('.createChatRoomIcon').css('filter', 'invert(0%');
      $('.createChatForm').css('height', '0');
      $('.chatList').css('opacity', '100%');
      setChatVisible('inVisible');
    }
  };

  return (
    <div className='chatMenu'>
      <h2><img className='iconImage' src={blog.iconImage}
               alt='icon' />{blog.blogName}</h2>
      <h6>_{blog.category} 계정</h6>
      <h6>{blog.info}</h6>
      <div className='btn5 btnHover' style={{ display: 'inline-block' }}>
        <h3>{followingList.length}</h3>Following
      </div>
      <div className='btn5 btnHover' style={{ display: 'inline-block' }}>
        <h3>{followerList.length}</h3>Follower
      </div>
      <br />
      <hr style={{ width: '80%', margin: '15px 10% 15px 10%' }} />
      <div className='chatSearch'>
        <img src={SearchImage} className='chatSearchButton' width='25px' />
        <input type='text' className='chatSearchInput' placeholder='채팅방 검색' />
      </div>
      <br />
      <div className='createChatRoom' onClick={CreateChat}>
        <span className='createChatRoomInfo'>채팅방 생성하기</span>
        <img className='createChatRoomIcon' src={AddIcon} width='20px'
             height='20px' />
      </div>
      <div className='chatNaviContents'>
        <input type='text' value={chatVisible} readOnly={true}
               style={{ display: 'none' }} />
        <div className='createChatForm'>
          <CreateChatForm followingList={followingList}/>
        </div>
        <div className='chatList'>
          {
            chatList.length < 1
              ? <i className='chatNull'>회원들과 채팅을 나눠보세요!<br />(채팅 기록 없음.)</i>
              : chatList.map((chatRoom) => (
                <ChatRoom key={chatRoom.id} chatRoom={chatRoom} />
              ))
          }
        </div>
      </div>
    </div>
  );
};

export default ChatNavigation;