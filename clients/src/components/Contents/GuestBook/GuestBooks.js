import React, { useEffect, useState } from 'react';
import GuestBookList from './GuestBookList';
import $ from 'jquery';

const GuestBooks = (blogOwnerCheck) => {

  const blog_name = window.location.pathname.split('/').at(3);
  let writeGuestBookComment;

  const writeGuestBook = (e) => {
    e.preventDefault();
    writeGuestBookComment = {
      comment: $("textarea[name='comment']").val()
    }
    fetch('http://localhost:8080/blog/'+blog_name+'/guestbook/write',{
      method: 'POST',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(writeGuestBookComment),
    })
    .then(res=>res.json())
    .then(res=>{
      alert('방명록이 작성되었습니다.');
      window.location.reload();
    });
  };

  const [guestBook, setGuestBook] = useState({});

  useEffect(()=>{
    fetch('http://localhost:8080/blog/'+blog_name+'/guestbook',{
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res=>res.json())
    .then(res=>{
      setGuestBook(res.guestBookList);
    });
  },[]);

  return (
    <div>
      <h4 className='mainTitle'>Guest Books</h4>
      <div className='divider'></div>
      <form onSubmit={writeGuestBook}>
        방명록 : <textarea name='comment' style={{
        width: '80%',
        height: '100px',
        verticalAlign: 'middle',
      }} />
        <button className='btn2 btnHover' type='submit'>작성하기</button>
      </form>
      <br />
      {
        guestBook.map&&
          guestBook.map((guestBooks)=>(
            <GuestBookList key={guestBooks.id} guestBooks={guestBooks} />
            ))
      }

    </div>
  );
};

export default GuestBooks;