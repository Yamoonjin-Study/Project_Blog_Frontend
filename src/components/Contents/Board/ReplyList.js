import React from 'react';
import '../../../assets/css/board.css';
import { Link } from 'react-router-dom';

const ReplyList = (replies) => {
  const reply = replies.replies;
  let post_date = new Date(reply.post_date);

  function dateFormat(post_date) {
    let month = post_date.getMonth() + 1;
    let day = post_date.getDate();
    let hour = post_date.getHours();
    let minute = post_date.getMinutes();
    let second = post_date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    return post_date.getFullYear() + '-' + month + '-' + day + ' ' + hour
      + ':' + minute + ':' + second;
  }
  return (
    <div className='replyList'>
      <h5>{reply.writer.nickname}</h5>
      {reply.content}
      <h6>{dateFormat(post_date)}</h6>
      <button>좋아요</button>
      <button>댓글달기</button>
    </div>
  );
};

export default ReplyList;