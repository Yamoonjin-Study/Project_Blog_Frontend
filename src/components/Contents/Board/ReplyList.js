import React from 'react';
import '../../../assets/css/board.css';
import $ from 'jquery';

const ReplyList = (replies) => {

  const reply = replies.replies;
  let postDate = new Date(reply.postDate);
  let content;

  function dateFormat(postDate) {
    let month = postDate.getMonth() + 1;
    let day = postDate.getDate();
    let hour = postDate.getHours();
    let minute = postDate.getMinutes();
    let second = postDate.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    return postDate.getFullYear() + '-' + month + '-' + day + ' ' + hour
      + ':' + minute + ':' + second;
  }

  const deleteReply = () => {
    fetch('http://localhost:8080/delete-reply/' + reply.id, {
      method: 'DELETE',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res => res.status)
    .then();

    alert('댓글을 삭제했습니다.');
    window.location.reload();
  };

  const displayUpdateReplyForm = () => {
    $('.updateReplyForm').css('display', 'none');
    $('.' + reply.id).css('display', 'inline-block');
    $('.reply_content_' + reply.id).css('display', 'none');
  };

  const hideUpdateReplyForm = () => {
    $('.' + reply.id).css('display', 'none');
    $('.reply_content_' + reply.id).css('display', 'block');
  };

  const updateReply = (e) => {
    e.preventDefault();
    content = $('.' + reply.id).children('textarea[name=content]').val();
    fetch('http://localhost:8080/update-reply/' + reply.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
      body: JSON.stringify({
        top_board_id: reply.id,
        top_reply_id: null,
        content: content,
        post_date: reply.postDate,
      }),
    })
    .then(res => res.status)
    .then(res => {
      console.log(res);
      console.log(content);
      alert('댓글을 수정했습니다.');
      window.location.reload();
    });
  };

  return (
    <div className='replyList'>
      <h5>{reply.writer.nickname}</h5>
      <p className={'reply_content_' + reply.id}>{reply.content}</p>
      <div className={'updateReplyForm '+reply.id}
           style={{ display: 'none' }}>
        <textarea name='content' defaultValue={reply.content}></textarea><br />
        <button onClick={updateReply}>
          수정하기
        </button>
        <button onClick={hideUpdateReplyForm}>
          취소하기
        </button>
      </div>
      <h6>{dateFormat(postDate)}
        {
          reply.writer.id.toString() === sessionStorage.getItem(
            'user_id').toString()
          && <button onClick={displayUpdateReplyForm}>수정하기</button>
        }
        {
          reply.writer.id.toString() === sessionStorage.getItem(
            'user_id').toString()
          && <button onClick={deleteReply}>삭제하기</button>
        }
      </h6>
      <button>좋아요</button>
      <button>댓글달기</button>
    </div>
  );
};

export default ReplyList;