import React, { useEffect, useState } from 'react';
import BoardMain from '../components/Contents/Board/BoardMain';
import BoardWrite from '../components/Contents/Board/BoardWrite';
import BoardUpdate from '../components/Contents/Board/BoardUpdate';

const BoardPage = () => {

  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/board-list', {
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res => res.json())
    .then(res => {
      setBoardList(res);
      console.log(res);
    });
  }, []);

  return (
    <div className='showBlogContent'>
      <BoardMain boardList={boardList}/>
      <BoardWrite />
      <BoardUpdate />
    </div>
  );
};

export default BoardPage;