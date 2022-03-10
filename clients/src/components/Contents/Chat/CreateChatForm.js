import React from 'react';
import SearchImage from '../../../assets/images/search.png';

const ChatForm = () => {

  return (
    <div>
      <br />
      <img src={SearchImage} className='chatSearchButton' width='25px' />
      <input type='text' className='chatSearchInput' placeholder='친구 검색' />
      <br />
      <br />
    </div>
  );
};

export default ChatForm;