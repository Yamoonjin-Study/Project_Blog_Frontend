import React, { useEffect, useState } from 'react';
import SearchImage from '../../../assets/images/search.png';
import $ from 'jquery';
import { Button } from 'react-bootstrap';

const ChatForm = (followingList) => {
    const chatUsers = followingList.followingList;
    const [checkedUsers, setCheckedUsers] = useState([]);

    const onChecked = (e) => {
      setCheckedUsers([]);
      $('input:checked').each(function() {
        setCheckedUsers(checkedUsers => [...checkedUsers, $(this).val()]);
      });
      $('input:checked').length === 0
        ? $('.checkedUsersDiv').css('height', '0')
        : $('.checkedUsersDiv').css('height', '130px');
      $('input:checked').length === 0
        ? $('.createChatRoomButton').css('-webkit-transition', '0s')
        : $('.createChatRoomButton').css('-webkit-transition', '0.3s');
      $('input:checked').length === 0
        ? $('.createChatRoomButton').css('height', '0')
        : $('.createChatRoomButton').css('height', '30px');
      $('input:checked').length === 0
        ? $('.chatRoomNameInput').css('display', 'none')
        : $('.chatRoomNameInput').css('display', 'block');
    };

    useEffect(() => {
      $('.checkedUsersDiv').scrollLeft($('.checkedUsersDiv').width());
    }, [checkedUsers]);

    const onCheckedDelete = (e) => {
      let targetValue = e.target.id;
      $('input:checkbox[value=' + targetValue + ']').prop('checked', false);
      onChecked();
    };

    const CreateButton = (e) => {
      let createChatRoom = {
        chatRoomName: $('.chatRoomNameInput').val(),
        chatRoomBloggerName: checkedUsers,
      };
      fetch('http://localhost:8080/create-chat-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-AUTH-TOKEN': sessionStorage.getItem('token'),
        },
        body: JSON.stringify(createChatRoom),
      })
      .then(res => res.status)
      .then(res => {
        console.log(res);
      });
    };

    const CancelButton = () => {
      $('input:checked').each(function() {
        $(this).prop('checked', false);
      });
      onChecked();
    };

    return (
      <div>
        <br />
        <img src={SearchImage} className='chatSearchButton' width='25px' />
        <input type='text' className='chatSearchInput'
               placeholder='?????? ??????????????? ?????????' />
        <br />
        <br />
        <div className='checkedUsersDiv'>
          {
            checkedUsers.map((blogNames, index) => (
              <span key={index} className='checkedUser'>{blogNames}<span
                id={blogNames}
                className='checkedUserDelete'
                onClick={onCheckedDelete}>x</span></span>
            ))
          }
          <br />
          <br />
          <input type='text' className='chatRoomNameInput' placeholder='????????? ??????' />
          <br />
          <br />
          <div className='createChatRoomButton'>
            <button className='btn4 btnHover' onClick={CreateButton}>????????????</button>
            <button className='btn4 btnHover' onClick={CancelButton}>????????????</button>
          </div>
        </div>
        {
          chatUsers.map((users) => (
            <div key={users.id} className='chatUserList'>
              <div className='profileIconImageDiv'>
                <img src={users.followingBlog.iconImage} width='20px' />
              </div>
              {users.followingBlog.blogName}
              <input type='checkbox' value={users.followingBlog.blogName}
                     onChange={onChecked} />
            </div>
          ))
        }
      </div>
    );
  }
;

export default ChatForm;