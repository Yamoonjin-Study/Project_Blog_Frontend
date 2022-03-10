import React from 'react';
import './ChatRooms.css'

const ChatRoom = () => {
  return (
    <div className='chatRooms'>
      <div className='chatRoomImg'>
        <img src='' width='50px' height='50px'/>
      </div>
      <div className='chatRoomInfo'>
        XXX 22.02.10 (16:30)<br/>
        안녕? 너 지금 뭐해?
      </div>
    </div>
  );
};

export default ChatRoom;