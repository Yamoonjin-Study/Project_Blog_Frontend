import React, { useEffect, useState } from 'react';
import BoardList from '../Board/BoardList';

const BlogBoardList = () => {
  const blog_name = window.location.pathname.split('/').at(3);
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/board-list/'+blog_name, {
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res => res.json())
    .then(res => {
      setBoardList(res);
    });
  }, []);

  return (
    <div className='showBlogContent'>
      <h4 className='mainTitle'>Board List</h4>
      <div className='divider' id='divider'></div>
      <br/>
      {
        boardList.map((boards)=>(
          <BoardList key={boards.id} boards={boards}/>
        ))
      }
    </div>
  );
};

export default BlogBoardList;