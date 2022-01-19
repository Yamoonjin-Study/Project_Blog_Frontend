import React from 'react';

const GuestBookList = (guestBooks) => {

  const guestBook = guestBooks.guestBooks;
  console.log(guestBook);
  console.log(sessionStorage.getItem('user_id'));

  let create_date = new Date(guestBook.date);

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

  const deleteGuestBook = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/blog/guestbook/delete/'+guestBook.id,{
      method: 'DELETE',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res=>res.json())
    .then(res=>{
      if(res.responseMessage === 'Delete GuestBook Success'){
        alert('삭제되었습니다.');
        window.location.reload();
      }else{
        alert('삭제되지 않았습니다.');
      }
    });
  }

  return (
    <div>
      <img src={guestBook.blog_icon} style={{
        width: '30px',
        height: 'auto',
      }} />{guestBook.nickname}{guestBook.comment}{dateFormat(create_date)}
      <button className='btn4 btnHover'>답글달기</button>
      {
        sessionStorage.getItem('user_id') === guestBook.user_id.toString() &&
        <button className='btn4 btnHover' onClick={deleteGuestBook}>삭제하기</button>
      }
    </div>
  );
};

export default GuestBookList;