import React from 'react';
import BoardList from './BoardList';

const BoardMain = ({boardList}) => {

  return (
    <div>
      <h4 className='mainTitle'>Boards</h4>
      <div className='divider'></div>
      <button className='btn2 btnHover'>Date</button>
      <button className='btn2 btnHover'>Views</button>
      <button className='btn2 btnHover'>Likes</button>
      <br/>
      {
        boardList.map((boards)=>(
          <BoardList key={boards.id} boards={boards}/>
        ))
      }
    </div>
  );
};

export default BoardMain;