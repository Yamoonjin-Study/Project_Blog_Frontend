import React, { useEffect, useState } from 'react';
import '../../../assets/css/board.css';
import ReplyList from './ReplyList';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import socket from '../../../config/socket';

const BoardDetail = ({ match }) => {
  const url = window.location.pathname;
  const id = match.params.board_id;
  const [board, setBoard] = useState({});

  const [replyList, setReplyList] = useState({});
  const [likes, setLikes] = useState({});
  const [reRender, setReRender] = useState('');

  let message;
  let toUserId;
  let fromUserId;

  useEffect(() => {
    setReRender('');
    fetch('http://localhost:8080/show-board/' + id, {
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res => res.json())
    .then(res => {
      setBoard(res.board);
      setReplyList(res.replies);
      setLikes(res.board.likes);
    });
  }, [reRender]);

  let create_date = new Date(board.createDate);

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

  const [reply, setReply] = useState({
    topBoardId: '',
    topReplyId: '',
    content: '',
  });

  const onChangeReply = (e) => {
    e.preventDefault();
    setReply({
      topBoardId: board.id,
      topReplyId: null,
      [e.target.name]: e.target.value,
    });
  };

  const SubmitReply = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/write-reply', {
      method: 'POST',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(reply),
    })
    .then(res => res.json())
    .then(res => {
      if (res.responseMessage === 'Write Reply Success') {
        message = res.reply.content;
        toUserId = res.reply.board.user.id;
        fromUserId = res.reply.writer.id;
        let alarm = {
          message: message,
          sender_id: fromUserId,
          receiver_id: toUserId,
          messageType: 'WriteReply',
          url: url,
        };
        fetch('http://localhost:8080/send-alarm', {
          method: 'POST',
          headers: {
            'X-AUTH-TOKEN': sessionStorage.getItem('token'),
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(alarm),
        })
        .then(res => res.json())
        .then(res => {
          if (res) {
            let alarmMessage = res.alarmMessage;
            socket.emit('alarm', {
              toUserId,
              fromUserId,
              alarmMessage: alarmMessage,
            }, (callback) => {
              if (callback) {
                alert('댓글작성이 완료되었습니다.');
                $('#replyTextarea').val('');
                setReRender('reRenderPlz');
              }
            });
          }
        });
      } else {
        alert('댓글작성에 실패하였습니다.');
      }
    });
  };

  const blog_name = window.location.pathname.split('/').at(3);

  const likeBoard = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/like-board/' + board.id, {
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
    .then(res => res.json())
    .then(res => {
      if (res.responseMessage === 'Like Board Success') {
        toUserId = board.user.id;
        fromUserId = res.like.user.id;
        let alarm = {
          message: '',
          sender_id: fromUserId,
          receiver_id: toUserId,
          messageType: 'LikeBoard',
          url: url,
        };
        fetch('http://localhost:8080/send-alarm', {
          method: 'POST',
          headers: {
            'X-AUTH-TOKEN': sessionStorage.getItem('token'),
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(alarm),
        })
        .then(res => res.json())
        .then(res => {
          if (res) {
            let alarmMessage = res.alarmMessage;
            socket.emit('alarm', {
              toUserId,
              fromUserId,
              alarmMessage: alarmMessage,
            }, (callback) => {
              if (callback) {
                alert('좋아요가 등록되었습니다.');
                setReRender('reRenderPlz');
              }
            });
          }
        });
      } else {
        alert('이미 좋아요한 게시글 입니다.');
      }
    });
  };

  return (
    <div>
      <h1>{board.title}</h1><br />
      <h6>작성일 : {dateFormat(create_date)}</h6>
      <div className='divider'></div>
      <div className='boardDetail'>
        {<h4 dangerouslySetInnerHTML={{ __html: board.content }}></h4>}
        <br />
        <h6>조회수 : {board.count}</h6>
        <h6>좋아요 : {likes.length}</h6>
        <Link to={'/yamoonjin.com/blog/' + blog_name + '/board/list'}>
          <button className='btn3 btnHover'>글 목록</button>
        </Link>
        <button className='btn3 btnHover' onClick={likeBoard}>좋아요</button>
      </div>
      {
        replyList.map &&
        replyList.map((replies) => (

          <ReplyList key={replies.id} replies={replies} />
        ))
      }
      <div className='divider'></div>
      <form>
        댓글 : <textarea id='replyTextarea' name='content' style={{
        width: '80%',
        height: '100px',
        verticalAlign: 'middle',
      }} onChange={onChangeReply} />
        <button className='btn2 btnHover' onClick={SubmitReply}>댓글달기</button>
      </form>
      <br />
      <br />
    </div>
  );
};

export default BoardDetail;