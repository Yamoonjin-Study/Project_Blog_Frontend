import React, { useEffect, useState } from 'react';
import '../../../assets/css/board.css';
import ReplyList from './ReplyList';

const BoardDetail = ({ match }) => {

  const id = match.params.board_id;

  const [board, setBoard] = useState({});
  const [replyList, setReplyList] = useState({});
  const [likes, setLikes] = useState({});

  useEffect(() => {
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
      setLikes(res.likes);
    });
  }, []);

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
    top_board_id: '',
    top_reply_id: '',
    content:'',
  })

  const onChangeReply = (e) => {
    e.preventDefault();
    setReply({
      top_board_id: board.id,
      top_reply_id: null,
      [e.target.name] : e.target.value
    });
  }

  const SubmitReply = () =>{
    fetch('http://localhost:8080/write-reply', {
      method: 'POST',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(reply)
    }).then(res => res.json())
    .then(res=>res);
    alert('댓글작성이 완료되었습니다.');
  }

  return (
    <div>
      <h1>{board.title}</h1><br/>
      <h6>작성일 : {dateFormat(create_date)}</h6>
      <div className='divider'></div>
      <div className='boardDetail'>
        {<h4 dangerouslySetInnerHTML={{ __html: board.content }}></h4>}
        <br />
        <h6>조회수 : {board.count}</h6>
        <h6>좋아요 : {likes.length}</h6>
        <button>글 목록</button>
        <button>좋아요</button>
      </div>
      {
        replyList.map &&
        replyList.map((replies) => (
          <ReplyList key={replies.id} replies={replies} />
        ))
      }
      <div className='divider'></div>
      <form>
        댓글 : <textarea name='content' style={{width:'80%', height:'100px', verticalAlign:'middle'}} onChange={onChangeReply}/>
        <button onClick={SubmitReply}>댓글달기</button>
      </form>
      <br />
      <br />
    </div>
  );
};

export default BoardDetail;